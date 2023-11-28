import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CountryState } from '../states/country.state';

export const selectAppState = createFeatureSelector<CountryState>('countries');

export const selectEuCountries = createSelector(
  selectAppState,
  (state: CountryState) => state.euCountries || []
);

export const selectCurrentCountry = createSelector(
  selectAppState,
  (state: CountryState) => state.currentCountry || {}
);
