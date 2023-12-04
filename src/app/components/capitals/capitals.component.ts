import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest, filter, map } from 'rxjs';
import {
  selectCurrentCountry,
  selectSortConfig,
  selectSortedEuCountries,
} from '../../store/selectors/country.selectors';
import { Country, SortConfig, SortType } from '../../models/country.model';
import { updateSortConfig } from '../../store/actions/country.actions';

@Component({
  selector: 'app-capitals',
  templateUrl: './capitals.component.html',
  styleUrl: './capitals.component.scss',
})
export class CapitalsComponent implements AfterViewInit {
  @ViewChild('capitalsList', { static: true }) capitalsList:
    | ElementRef
    | undefined;

  currentCountry$: Observable<Country | undefined>;
  euCountries$: Observable<Country[]>;
  sortMenuItems: SortType[] = ['country', 'capital', 'weather.temp'];
  sortConfig$: Observable<SortConfig>;
  isAtBottom = false;

  constructor(private store: Store) {
    this.currentCountry$ = this.store.pipe(select(selectCurrentCountry));
    this.sortConfig$ = this.store.pipe(select(selectSortConfig));

    this.euCountries$ = combineLatest([
      this.store.pipe(select(selectSortedEuCountries)),
      this.currentCountry$.pipe(filter(Boolean)),
    ]).pipe(
      filter(
        ([euCountries, currentCountry]) =>
          euCountries.length > 0 && !!currentCountry
      ),
      map(([euCountries, currentCountry]) => {
        return euCountries.filter(
          (country) => country.capital !== currentCountry?.capital
        );
      })
    );
  }

  ngAfterViewInit() {
    if (this.capitalsList && this.capitalsList.nativeElement) {
      this.capitalsList.nativeElement.addEventListener(
        'scroll',
        this.handleScroll.bind(this)
      );
    }
  }

  handleSorting(sortType: SortType): void {
    this.store.dispatch(updateSortConfig({ sortType }));
  }

  private handleScroll(): void {
    const container = this.capitalsList?.nativeElement;
    this.isAtBottom =
      Math.abs(
        container.scrollHeight - container.scrollTop - container.clientHeight
      ) < 10;
  }
}
