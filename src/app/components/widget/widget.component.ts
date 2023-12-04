import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Country } from '../../models/country.model';
import { updateActiveLocation } from '../../store/actions/country.actions';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.scss',
})
export class WidgetComponent {
  @Input() country: Country | undefined;
  @Input() isActive = false;
  isCapitalsRoute: boolean;
  capitalsRoute = '/capitals';
  capitalRoute = '/capital';

  constructor(private store: Store, private router: Router) {
    this.isCapitalsRoute =
      this.router.routerState.snapshot.url === this.capitalsRoute;
  }

  navigate(): void {
    const destination = this.isCapitalsRoute
      ? this.capitalRoute
      : this.capitalsRoute;

    this.router.navigate([destination]).then(() => {
      if (!this.isActive && this.country) {
        this.store.dispatch(
          updateActiveLocation({ location: this.country.coordinates })
        );
      }
    });
  }
}
