import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  url = 'https://restcountries.com/v3.1/all';

  constructor(private http: HttpClient) {}

  loadCountries() {
    return this.http.get<any[]>(this.url);
  }
}
