import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectEuCountries } from '../../store/selectors/country.selectors';
import { Country } from '../../models/country.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-capitals',
  templateUrl: './capitals.component.html',
  styleUrl: './capitals.component.scss',
})
export class CapitalsComponent {
  euCountries$: Observable<Country[]>;

  constructor(private store: Store) {
    this.euCountries$ = this.store.pipe(select(selectEuCountries));
  }
}
