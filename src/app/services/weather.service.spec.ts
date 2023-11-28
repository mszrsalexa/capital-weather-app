import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import {
  Country,
  ForecastApiResponse,
  WeatherApiResponse,
} from '../models/country.model';

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

  it('should load current weather', () => {
    const mockCountry: Country = {
      coordinates: { lat: 12.34, lng: 56.78 },
      countryName: 'test',
      capitalName: 'test',
      flag: 'test',
    };

    const mockResponse: WeatherApiResponse = {
      coord: {},
      main: { temp: 0 },
      weather: [{ description: 'test', icon: 'test' }],
    };

    service.loadCurrentWeather(mockCountry).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${service.baseUrl}/weather?lat=${mockCountry.coordinates.lat}&lon=${mockCountry.coordinates.lng}&units=metric&appid=65ecd9f4ad1a12c46d0845b39a6452ca`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should load five-day forecast', () => {
    const mockCountry: Country = {
      coordinates: { lat: 12.34, lng: 56.78 },
      countryName: '',
      capitalName: '',
      flag: '',
    };

    const mockResponse: ForecastApiResponse = {
      list: [
        {
          dt_txt: 'test',
          main: { temp_min: 0, temp_max: 4 },
        },
      ],
    };
    service.loadFiveDayForecast(mockCountry).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${service.baseUrl}/forecast?lat=${mockCountry.coordinates.lat}&lon=${mockCountry.coordinates.lng}&units=metric&appid=65ecd9f4ad1a12c46d0845b39a6452ca`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
