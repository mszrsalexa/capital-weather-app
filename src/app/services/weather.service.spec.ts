import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { Country } from '../models/country.model';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService],
    });

    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load current weather', fakeAsync(() => {
    const country: Country = { coordinates: { lat: 1, lng: 1 } } as any;
    const weatherApiResponse = {
      main: { temp: 25 },
      weather: [{ description: 'Clear' }],
    } as any;

    let result: any;

    service.loadCurrentWeather(country).subscribe((response) => {
      result = response;
    });

    const req = httpMock.expectOne((req) =>
      req.url.startsWith(
        `${service.baseUrl}/weather?lat=1&lon=1&units=metric&appid=`
      )
    );
    req.flush(weatherApiResponse);

    tick();

    expect(result).toEqual(weatherApiResponse);
  }));

  it('should load five-day forecast', fakeAsync(() => {
    const coordinates = { lat: 1, lng: 1 };
    const forecastApiResponse = {
      list: [{ main: { temp: 20 }, weather: [{ description: 'Cloudy' }] }],
    } as any;

    let result: any;

    service.loadFiveDayForecast(coordinates).subscribe((response) => {
      result = response;
    });

    const req = httpMock.expectOne((req) =>
      req.url.startsWith(
        `${service.baseUrl}/forecast?lat=1&lon=1&units=metric&appid=`
      )
    );
    req.flush(forecastApiResponse);

    tick();

    expect(result).toEqual(forecastApiResponse);
  }));
});
