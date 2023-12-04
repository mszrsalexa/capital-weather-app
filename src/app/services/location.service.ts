import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
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
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private apiKey = environment.googleMapsApiKey;
  private maxDestinationsPerRequest = 25;

  distanceMatrixData: DistanceMatrixElement[] = [];
  destinations: Country[] = [];

  defaultLocation: Coordinates = {
    lat: 47.5,
    lng: 19.08,
  };

  constructor(private http: HttpClient) {}

  findCurrentLocation(euCountries: Country[]): Observable<Coordinates> {
    this.destinations = euCountries;

    const targetLocation$ = from(this.getLocation());

    return targetLocation$.pipe(
      take(1),
      switchMap((targetLocation) => {
        if (this.isDefaultLocation(targetLocation)) {
          return of(this.defaultLocation);
        } else {
          const chunks = this.splitDestinationsIntoChunks();

          const requests = chunks.map((chunk) => {
            const destinations = chunk
              .map(
                (country: Country) =>
                  `${country.coordinates.lat},${country.coordinates.lng}`
              )
              .join('|');

            return this.getDistanceMatrixObservable(
              targetLocation,
              destinations
            );
          });

          return forkJoin(requests).pipe(
            switchMap((responses: DistanceMatrixResponse[]) =>
              this.processResponses(responses)
            ),
            catchError(() => of(this.defaultLocation))
          );
        }
      })
    );
  }

  private processResponses(
    responses: DistanceMatrixResponse[]
  ): Observable<Coordinates> {
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

    const closestCountry = this.destinations[
      this.distanceMatrixData.indexOf(closestElement)
    ] as Country;

    return of(closestCountry.coordinates);
  }

  private getDistanceMatrixObservable(
    targetLocation: Coordinates,
    destinations: string
  ): Observable<DistanceMatrixResponse> {
    const distanceMatrixUrl = `/maps/api/distancematrix/json?origins=${targetLocation.lat},${targetLocation.lng}&destinations=${destinations}&key=${this.apiKey}`;
    return this.http
      .get<DistanceMatrixResponse>(distanceMatrixUrl)
      .pipe(
        catchError(() =>
          of({ rows: [{ elements: [] }] } as DistanceMatrixResponse)
        )
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
          console.log(error.message);
          resolve(this.defaultLocation);
        }
      );
    });
  }

  private isDefaultLocation(location: Coordinates): boolean {
    return (
      location.lat === this.defaultLocation.lat &&
      location.lng === this.defaultLocation.lng
    );
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
