import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { requestLoadCountries } from './store/actions/country.actions';
import { GoogleMapsService } from './services/google-maps.service';
import { selectIsLoading } from './store/selectors/country.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isLoading$: Observable<boolean>;

  constructor(
    private store: Store,
    private googleMapsService: GoogleMapsService
  ) {
    this.store.dispatch(requestLoadCountries());
    this.googleMapsService.loadGoogleMaps();
    this.isLoading$ = this.store.pipe(select(selectIsLoading));
  }
}
