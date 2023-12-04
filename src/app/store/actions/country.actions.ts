import { createAction, props } from '@ngrx/store';
import {
  Coordinates,
  Country,
  Forecast,
  SortType,
  Weather,
} from '../../models/country.model';

export const requestLoadCountries = createAction(
  '[Country] Request Load Counties'
);

export const loadEuCountries = createAction(
  '[Country] Load EU Countries',
  props<{ euCountries: Country[] }>()
);

export const updateActiveLocation = createAction(
  '[Country] Update Active Location',
  props<{ location: Coordinates }>()
);

export const loadCurrentWeather = createAction(
  '[Country] Load Current Weather',
  props<{ weathers: Weather[] }>()
);

export const loadFiveDayForecast = createAction(
  '[Country] Load 5-day Forecast',
  props<{ coordinates: Coordinates; forecast: Forecast[] }>()
);

export const updateSortConfig = createAction(
  '[Country] Update Sort Config',
  props<{ sortType: SortType }>()
);
