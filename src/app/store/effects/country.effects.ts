import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, withLatestFrom, mergeMap } from 'rxjs/operators';
import { combineLatest, forkJoin, from, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { DatePipe } from '@angular/common';

import { CountryService } from '../../services/country.service';
import {
  loadCurrentWeather,
  loadEuCountries,
  loadFiveDayForecast,
  requestLoadCountries,
  updateActiveLocation,
} from '../actions/country.actions';
import { LocationService } from '../../services/location.service';
import {
  selectActiveLocation,
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
      switchMap(() => {
        return forkJoin({
          capitalInfo$: this.countryService.loadCapitalInfo(),
          euCountries$: this.countryService.loadEuCountries(),
        }).pipe(
          map(({ capitalInfo$, euCountries$ }) => {
            const euCountries = euCountries$
              .filter((country) => country.independent)
              .map(({ name, flags, capital, numericCode }) => {
                const capitalData = capitalInfo$.find(
                  (info: any) => info.ccn3 === numericCode
                );

                return {
                  country: name,
                  flag: flags.png,
                  capital: capital,
                  coordinates: {
                    lat: capitalData?.capitalInfo.latlng[0] || 0,
                    lng: capitalData?.capitalInfo.latlng[1] || 0,
                  },
                };
              });

            return loadEuCountries({ euCountries });
          })
        );
      })
    )
  );

  loadCurrentWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEuCountries),
      switchMap((action) =>
        combineLatest(
          action.euCountries.map((country) =>
            this.weatherService.loadCurrentWeather(country).pipe(
              map((data: WeatherApiResponse) => {
                const currentWeather: Weather = {
                  coordinates: country.coordinates,
                  temp: data.main.temp,
                  temp_max: data.main.temp_max,
                  temp_min: data.main.temp_min,
                  description: data.weather[0].description,
                  icon: data.weather[0].icon,
                };
                return currentWeather;
              })
            )
          )
        ).pipe(
          mergeMap((weathers) => {
            return of(loadCurrentWeather({ weathers }));
          })
        )
      )
    )
  );

  getActiveLocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCurrentWeather),
      withLatestFrom(this.store.pipe(select(selectEuCountries))),
      switchMap(([action, euCountries]) => {
        return from(this.locationService.findCurrentLocation(euCountries)).pipe(
          map((location) => {
            return updateActiveLocation({ location });
          })
        );
      })
    )
  );

  loadFiveDayForeast$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateActiveLocation),
      withLatestFrom(this.store.pipe(select(selectActiveLocation))),
      switchMap(([action, coordinates]) =>
        this.weatherService.loadFiveDayForecast(coordinates).pipe(
          map((data: ForecastApiResponse) => {
            const forecast = this.formatForecastApiResponse(data);

            return loadFiveDayForecast({ coordinates, forecast });
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

    const currentDate = new Date();

    for (const date in groupedByDate) {
      if (groupedByDate.hasOwnProperty(date)) {
        const dateObject = new Date(date);

        if (dateObject.getDate() !== currentDate.getDate()) {
          const forecasts = groupedByDate[date];
          const temps = forecasts.map((f) => f.main.temp);
          const minTemp = Math.round(Math.min(...temps));
          const maxTemp = Math.round(Math.max(...temps));
          const datePipe = new DatePipe('en-US');
          const dayOfWeek = datePipe.transform(dateObject, 'EEE');

          const processedForecast: Forecast = {
            date: date,
            day: dayOfWeek || '',
            temp_min: minTemp === 0 ? 0 : minTemp,
            temp_max: maxTemp === 0 ? 0 : maxTemp,
            description: forecasts[0].weather[0].description,
            icon: forecasts[0].weather[0].icon,
          };

          forecast.push(processedForecast);
        }
      }
    }
    return forecast;
  }
}
