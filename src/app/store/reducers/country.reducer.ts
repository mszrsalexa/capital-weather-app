import { createReducer, on } from '@ngrx/store';

import {
  loadCurrentWeather,
  loadEuCountries,
  loadFiveDayForecast,
  requestCurrentWeather,
  requestCurrentCountry,
  requestFiveDayForecast,
  requestLoadCountries,
  updateCurrentCountry,
} from '../actions/country.actions';
import { CountryState } from '../states/country.state';

export const initialState: CountryState = {
  euCountries: [],
  currentCountry: {
    countryName: '',
    capitalName: '',
    flag: '',
    coordinates: {
      lat: 47.5,
      lng: 19.08,
    },
  },
};

export const countryReducer = createReducer(
  initialState,
  on(requestLoadCountries, (state) => ({ ...state })),
  on(loadEuCountries, (state, { euCountries }) => ({
    ...state,
    euCountries: euCountries,
  })),
  on(requestCurrentCountry, (state) => ({ ...state })),
  on(updateCurrentCountry, (state, { currentCountry }) => ({
    ...state,
    currentCountry: currentCountry,
  })),
  on(requestCurrentWeather, (state) => ({
    ...state,
  })),
  on(loadCurrentWeather, (state, { currentWeather }) => ({
    ...state,
    currentCountry: { ...state.currentCountry, weather: currentWeather },
  })),
  on(requestFiveDayForecast, (state) => ({
    ...state,
  })),
  on(loadFiveDayForecast, (state, { forecast }) => ({
    ...state,
    currentCountry: { ...state.currentCountry, forecast: forecast },
  }))
);
