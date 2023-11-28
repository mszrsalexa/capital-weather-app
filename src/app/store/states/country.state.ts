import { Country } from '../../models/country.model';

export interface CountryState {
  euCountries: Country[];
  currentCountry: Country;
}
