import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule, select } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CapitalComponent } from './capital.component';
import { WidgetComponent } from '../widget/widget.component';
import { IconComponent } from '../icon/icon.component';

describe('CapitalComponent', () => {
  let component: CapitalComponent;
  let fixture: ComponentFixture<CapitalComponent>;
  let store: MockStore;

  const initialState = {
    country: {
      currentCountry: {},
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CapitalComponent, WidgetComponent, IconComponent],
      imports: [StoreModule.forRoot({})],
      providers: [provideMockStore({ initialState })],
    });

    fixture = TestBed.createComponent(CapitalComponent);
    component = fixture.componentInstance;
    store = TestBed.inject<Store>(Store) as MockStore;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
