import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Country, MapType } from '../../models/country.model';
import { selectCurrentCountry } from '../../store/selectors/country.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-capital',
  templateUrl: './capital.component.html',
  styleUrl: './capital.component.scss',
})
export class CapitalComponent {
  country$: Observable<Country | undefined>;
  mapTypeMenuItems: MapType[] = ['roadmap', 'satellite'];
  selectedMapType: MapType = 'roadmap';

  constructor(private store: Store) {
    this.country$ = this.store.pipe(select(selectCurrentCountry));
  }

  changeMapType(mapType: MapType): void {
    this.selectedMapType = mapType;
  }
}
