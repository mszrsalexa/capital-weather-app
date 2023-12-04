import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CountryState } from '../states/country.state';
import { Country } from '../../models/country.model';

const selectAppState = createFeatureSelector<CountryState>('countries');

export const selectEuCountries = createSelector(
  selectAppState,
  (state: CountryState) => state.euCountries || []
);

export const selectActiveLocation = createSelector(
  selectAppState,
  (state: CountryState) => state.activeLocation || {}
);

export const selectIsLoading = createSelector(
  selectAppState,
  (state: CountryState) => state.isLoading
);

export const selectSortConfig = createSelector(
  selectAppState,
  (state: CountryState) => state.sortConfig || {}
);

export const selectSortedEuCountries = createSelector(
  selectEuCountries,
  selectSortConfig,
  (euCountries, sortConfig) => {
    if (!euCountries || euCountries.length <= 0) {
      return [];
    }
    const sortedEuCountries = [...euCountries].sort((a, b) => {
      const aValue = getPropertyValue(a, sortConfig.type) as number | string;
      const bValue = getPropertyValue(b, sortConfig.type) as number | string;

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.order === 'asc' ? aValue - bValue : bValue - aValue;
      } else {
        return sortConfig.order === 'asc'
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      }
    });
    return sortedEuCountries;
  }
);

const getPropertyValue = (obj: any, propertyPath: string): any => {
  const properties = propertyPath.split('.');

  let value = obj;
  for (const prop of properties) {
    if (value && prop in value) {
      value = value[prop];
    } else {
      return undefined;
    }
  }

  return value;
};

export const selectCurrentCountry = createSelector(
  selectEuCountries,
  selectActiveLocation,
  (euCountries, activeLocation) => {
    const currentCountry = euCountries.find(
      (country: Country) =>
        country.coordinates.lat === activeLocation.lat &&
        country.coordinates.lng === activeLocation.lng
    );

    return currentCountry;
  }
);

export const selectCurrentWeather = createSelector(
  selectCurrentCountry,
  (country) => country?.weather || {}
);

export const selectCurrentForecast = createSelector(
  selectCurrentCountry,
  (country) => country?.fiveDayForecast?.forecast || []
);
