import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Coordinates,
  Country,
  ForecastApiResponse,
  WeatherApiResponse,
} from '../models/country.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = environment.openWeatherApiKey;
  baseUrl = 'https://api.openweathermap.org/data/2.5';

  constructor(private http: HttpClient) {}

  loadCurrentWeather(country: Country): Observable<WeatherApiResponse> {
    const url = `${this.baseUrl}/weather?lat=${country.coordinates.lat}&lon=${country.coordinates.lng}&units=metric&appid=${this.apiKey}`;

    return this.http.get<WeatherApiResponse>(url);
  }

  loadFiveDayForecast(
    coordinates: Coordinates
  ): Observable<ForecastApiResponse> {
    const url = `${this.baseUrl}/forecast?lat=${coordinates.lat}&lon=${coordinates.lng}&units=metric&appid=${this.apiKey}`;
    return this.http.get<ForecastApiResponse>(url);
  }
}
