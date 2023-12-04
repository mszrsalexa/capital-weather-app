import { createReducer, on } from '@ngrx/store';

import {
  loadCurrentWeather,
  loadEuCountries,
  loadFiveDayForecast,
  requestLoadCountries,
  updateActiveLocation,
  updateSortConfig,
} from '../actions/country.actions';
import { CountryState } from '../states/country.state';
import { Coordinates, SortConfig, SortOrder } from '../../models/country.model';

const defaultLocation: Coordinates = {
  lat: 0,
  lng: 0,
};

const defaultSorting: SortConfig = {
  type: 'capital',
  order: 'asc',
};

const initialState: CountryState = {
  euCountries: [],
  activeLocation: defaultLocation,
  sortConfig: defaultSorting,
  isLoading: false,
};

export const countryReducer = createReducer(
  initialState,
  on(requestLoadCountries, (state) => ({ ...state, isLoading: true })),
  on(loadEuCountries, (state, { euCountries }) => ({
    ...state,
    euCountries: euCountries,
  })),
  on(updateActiveLocation, (state, { location }) => ({
    ...state,
    activeLocation: location,
    isLoading: false,
  })),
  on(loadCurrentWeather, (state, { weathers }) => ({
    ...state,
    euCountries: state.euCountries.map((country) => {
      const weather = weathers.find((weather) =>
        isMatchingCoordinates(country.coordinates, weather.coordinates)
      );

      return weather ? { ...country, weather } : country;
    }),
  })),
  on(loadFiveDayForecast, (state, fiveDayForecast) => ({
    ...state,
    euCountries: state.euCountries.map((country) => {
      return isMatchingCoordinates(
        country.coordinates,
        fiveDayForecast.coordinates
      )
        ? { ...country, fiveDayForecast }
        : country;
    }),
  })),
  on(updateSortConfig, (state, { sortType }) => ({
    ...state,
    sortConfig: {
      type: sortType,
      order:
        state.sortConfig.type === sortType && state.sortConfig.order === 'asc'
          ? ('desc' as SortOrder)
          : ('asc' as SortOrder),
    },
  }))
);

const isMatchingCoordinates = (
  coord1: Coordinates,
  coord2: Coordinates
): boolean => {
  return coord1.lat === coord2.lat && coord1.lng === coord2.lng;
};
