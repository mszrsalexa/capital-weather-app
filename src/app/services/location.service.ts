import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  EMPTY,
  Observable,
  catchError,
  forkJoin,
  from,
  of,
  switchMap,
  take,
} from 'rxjs';
import {
  Coordinates,
  Country,
  DistanceMatrixElement,
  DistanceMatrixResponse,
} from '../models/country.model';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private apiKey = 'AIzaSyAWNbd99g7AMtXsCPHoufqDwLR24NOhbXs';
  private maxDestinationsPerRequest = 25;

  distanceMatrixData: DistanceMatrixElement[] = [];
  destinations: Country[] = [];

  currentCountry: Country = {
    countryName: 'Hungary',
    capitalName: 'Budapest',
    flag: '',
    coordinates: {
      lat: 47.5,
      lng: 19.08,
    },
  };

  constructor(private http: HttpClient) {}

  findCurrentCountry(euCountries: Country[]): Observable<Country> {
    this.destinations = euCountries;

    const targetLocation$ = from(this.getLocation());
    const chunks = this.splitDestinationsIntoChunks();

    const requests = chunks.map((chunk) => {
      const destinations = chunk
        .map(
          (country: Country) =>
            `${country.coordinates.lat},${country.coordinates.lng}`
        )
        .join('|');

      return this.getDistanceMatrixObservable(targetLocation$, destinations);
    });

    return forkJoin(requests).pipe(
      switchMap((responses: DistanceMatrixResponse[]) =>
        this.processResponses(responses)
      )
    );
  }

  private processResponses(
    responses: DistanceMatrixResponse[]
  ): Observable<Country> {
    const validResponses = responses.filter((response) => response !== null);

    this.distanceMatrixData = validResponses.flatMap((data: any) =>
      Object.values(data.rows[0].elements)
    );

    const closestElement = this.distanceMatrixData
      .filter((element: DistanceMatrixElement) => element.status === 'OK')
      .reduce(
        (closest: DistanceMatrixElement, current: DistanceMatrixElement) =>
          current.distance.value < closest.distance.value ? current : closest
      );

    this.currentCountry = this.destinations[
      this.distanceMatrixData.indexOf(closestElement)
    ] as Country;

    return of(this.currentCountry);
  }

  private getDistanceMatrixObservable(
    targetLocation$: Observable<Coordinates>,
    destinations: string
  ): Observable<DistanceMatrixResponse> {
    return targetLocation$.pipe(
      take(1),
      switchMap((targetLocation) => {
        const distanceMatrixUrl = `/maps/api/distancematrix/json?origins=${targetLocation.lat},${targetLocation.lng}&destinations=${destinations}&key=${this.apiKey}`;

        return this.http.get<DistanceMatrixResponse>(distanceMatrixUrl);
      })
    );
  }

  private getLocation(): Promise<Coordinates> {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation: Coordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          resolve(currentLocation);
        },
        (error) => {
          console.log(`Error getting location: ${error.message}`);
          resolve(this.currentCountry.coordinates);
        }
      );
    });
  }

  private splitDestinationsIntoChunks(): Country[][] {
    const chunks: Country[][] = [];
    for (
      let i = 0;
      i < this.destinations.length;
      i += this.maxDestinationsPerRequest
    ) {
      chunks.push(
        this.destinations.slice(i, i + this.maxDestinationsPerRequest)
      );
    }
    return chunks;
  }
}
