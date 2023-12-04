import { Coordinates, Country, SortConfig } from '../../models/country.model';

export interface CountryState {
  euCountries: Country[];
  activeLocation: Coordinates;
  sortConfig: SortConfig;
  isLoading: boolean;
}
