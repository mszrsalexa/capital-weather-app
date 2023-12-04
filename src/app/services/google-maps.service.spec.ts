import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { GoogleMapsService } from './google-maps.service';
import { TestBed } from '@angular/core/testing';

describe('GoogleMapsService', () => {
  let service: GoogleMapsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GoogleMapsService],
    });

    service = TestBed.inject(GoogleMapsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
