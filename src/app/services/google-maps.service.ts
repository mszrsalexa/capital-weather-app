import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, shareReplay } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GoogleMapsService {
  private apiKey = environment.googleMapsApiKey;
  private apiLoaded$: Observable<boolean> | undefined;

  constructor(private http: HttpClient) {}

  loadGoogleMaps() {
    if (!this.apiLoaded$) {
      const url = `/maps/api/js?key=${this.apiKey}`;

      this.apiLoaded$ = this.http.jsonp(url, 'callback').pipe(
        map(() => true),
        catchError(() => of(false)),
        shareReplay(1)
      );
    }

    return this.apiLoaded$;
  }

  isApiLoaded(): Observable<boolean> {
    return this.apiLoaded$ || of(false);
  }
}
