import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule, select } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CapitalsComponent } from './capitals.component';
import { WidgetComponent } from '../widget/widget.component';
import { IconComponent } from '../icon/icon.component';

describe('CapitalsComponent', () => {
  let component: CapitalsComponent;
  let fixture: ComponentFixture<CapitalsComponent>;
  let store: MockStore;

  const initialState = {
    country: {
      euCountries: [{}],
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CapitalsComponent, WidgetComponent, IconComponent],
      imports: [StoreModule.forRoot({})],
      providers: [provideMockStore({ initialState })],
    });

    fixture = TestBed.createComponent(CapitalsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject<Store>(Store) as MockStore;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
