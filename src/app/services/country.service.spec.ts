import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CountryService } from './country.service';

describe('CountryService', () => {
  let service: CountryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountryService],
    });

    service = TestBed.inject(CountryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load EU countries', inject(
    [CountryService, HttpTestingController],
    (countryService: CountryService, httpMock: HttpTestingController) => {
      const mockEuCountries = [{ name: 'Country1' }, { name: 'Country2' }];

      countryService.loadEuCountries().subscribe((countries) => {
        expect(countries).toEqual(mockEuCountries);
      });

      const req = httpMock.expectOne(
        'https://restcountries.com/v2/regionalbloc/eu'
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockEuCountries);
    }
  ));

  it('should load capital info', inject(
    [CountryService, HttpTestingController],
    (countryService: CountryService, httpMock: HttpTestingController) => {
      const mockCapitalInfo = [
        { ccn3: '1', capitalInfo: { latlng: [10, 20] } },
        { ccn3: '2', capitalInfo: { latlng: [30, 40] } },
      ];

      countryService.loadCapitalInfo().subscribe((capitalInfo) => {
        expect(capitalInfo).toEqual(mockCapitalInfo);
      });

      const req = httpMock.expectOne(
        'https://restcountries.com/v3.1/region/eu?fields=capitalInfo,ccn3'
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockCapitalInfo);
    }
  ));
});
