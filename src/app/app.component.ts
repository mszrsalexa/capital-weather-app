import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { requestLoadCountries } from './store/actions/country.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private store: Store) {
    this.store.dispatch(requestLoadCountries());
  }
}
