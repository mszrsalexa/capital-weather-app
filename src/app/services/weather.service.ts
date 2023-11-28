import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Country,
  ForecastApiResponse,
  WeatherApiResponse,
} from '../models/country.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '65ecd9f4ad1a12c46d0845b39a6452ca';
  baseUrl = 'https://api.openweathermap.org/data/2.5';

  constructor(private http: HttpClient) {}

  loadCurrentWeather(country: Country): Observable<WeatherApiResponse> {
    const url = `${this.baseUrl}/weather?lat=${country.coordinates.lat}&lon=${country.coordinates.lng}&units=metric&appid=${this.apiKey}`;

    return this.http.get<WeatherApiResponse>(url);
  }

  loadFiveDayForecast(country: Country): Observable<ForecastApiResponse> {
    const url = `${this.baseUrl}/forecast?lat=${country.coordinates.lat}&lon=${country.coordinates.lng}&units=metric&appid=${this.apiKey}`;

    return this.http.get<ForecastApiResponse>(url);
  }
}
