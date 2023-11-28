import { createAction, props } from '@ngrx/store';
import { Country, Forecast, Weather } from '../../models/country.model';

export const requestLoadCountries = createAction(
  '[Country] Request Load Counties'
);

export const loadEuCountries = createAction(
  '[Country] Load EU Countries',
  props<{ euCountries: Country[] }>()
);

export const requestCurrentCountry = createAction(
  '[Country] Request Default Country'
);

export const updateCurrentCountry = createAction(
  '[Country] Update Default Country',
  props<{ currentCountry: Country }>()
);

export const requestCurrentWeather = createAction(
  '[Country] Request Current Weather'
);

export const loadCurrentWeather = createAction(
  '[Country] Load Current Weather',
  props<{ currentWeather: Weather }>()
);

export const requestFiveDayForecast = createAction(
  '[Country] Request 5-day Forecast'
);

export const loadFiveDayForecast = createAction(
  '[Country] Load 5-day Forecast',
  props<{ forecast: Forecast[] }>()
);
