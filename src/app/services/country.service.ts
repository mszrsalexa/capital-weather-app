import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient) {}

  loadEuCountries() {
    return this.http.get<any[]>('https://restcountries.com/v2/regionalbloc/eu');
  }

  loadCapitalInfo() {
    return this.http.get<any[]>(
      'https://restcountries.com/v3.1/region/eu?fields=capitalInfo,ccn3'
    );
  }
}
