import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { from } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { CountryService } from '../../services/country.service';
import {
  loadCurrentWeather,
  loadEuCountries,
  loadFiveDayForecast,
  requestLoadCountries,
  updateCurrentCountry,
} from '../actions/country.actions';
import { LocationService } from '../../services/location.service';
import {
  selectCurrentCountry,
  selectEuCountries,
} from '../selectors/country.selectors';
import { WeatherService } from '../../services/weather.service';
import {
  Forecast,
  ForecastApiResponse,
  Weather,
  WeatherApiResponse,
} from '../../models/country.model';

@Injectable()
export class CountryEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private countryService: CountryService,
    private locationService: LocationService,
    private weatherService: WeatherService
  ) {}

  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestLoadCountries),
      switchMap(() =>
        this.countryService.loadCountries().pipe(
          map((data) => {
            const euCountries = data
              .filter(
                (country) =>
                  country &&
                  country.region?.includes('Europe') &&
                  country.unMember
              )
              .map(({ name, flags, capital, capitalInfo }) => ({
                countryName: name.common,
                flag: flags.png,
                capitalName: capital[0],
                coordinates: {
                  lat: capitalInfo.latlng[0],
                  lng: capitalInfo.latlng[1],
                },
              }));
            return loadEuCountries({ euCountries });
          })
        )
      )
    )
  );

  getCurrentCountry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEuCountries),
      withLatestFrom(this.store.pipe(select(selectEuCountries))),
      switchMap(([action, euCountries]) => {
        return from(this.locationService.findCurrentCountry(euCountries)).pipe(
          map((currentCountry) => {
            return updateCurrentCountry({ currentCountry });
          })
        );
      })
    )
  );

  loadCurrentWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCurrentCountry),
      withLatestFrom(this.store.pipe(select(selectCurrentCountry))),
      switchMap(([action, country]) =>
        this.weatherService.loadCurrentWeather(country).pipe(
          map((data: WeatherApiResponse) => {
            const currentWeather: Weather = {
              coordinates: data.coord,
              temp: data.main.temp,
              description: data.weather[0].description,
              icon: data.weather[0].icon,
            };
            return loadCurrentWeather({ currentWeather });
          })
        )
      )
    )
  );

  loadFiveDayForeast$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCurrentWeather),
      withLatestFrom(this.store.pipe(select(selectCurrentCountry))),
      switchMap(([action, country]) =>
        this.weatherService.loadFiveDayForecast(country).pipe(
          map((data: ForecastApiResponse) => {
            const forecast = this.formatForecastApiResponse(data);

            return loadFiveDayForecast({ forecast });
          })
        )
      )
    )
  );

  private formatForecastApiResponse(data: ForecastApiResponse): Forecast[] {
    const forecast: Forecast[] = [];

    const groupedByDate: {
      [key: string]: ForecastApiResponse['list'];
    } = data.list.reduce((acc, forecast) => {
      const date = forecast['dt_txt'].split(' ')[0];
      acc[date] = acc[date] || [];
      acc[date].push(forecast);
      return acc;
    }, {} as { [key: string]: ForecastApiResponse['list'] });

    for (const date in groupedByDate) {
      if (groupedByDate.hasOwnProperty(date)) {
        const forecasts = groupedByDate[date];

        const tempMinValues = forecasts.map((f) => f.main.temp_min);
        const tempMaxValues = forecasts.map((f) => f.main.temp_max);

        const minTemp = Math.min(...tempMinValues);
        const maxTemp = Math.max(...tempMaxValues);

        const processedForecast: Forecast = {
          date: date,
          temp_min: minTemp,
          temp_max: maxTemp,
        };

        forecast.push(processedForecast);
      }
    }
    return forecast;
  }
}
