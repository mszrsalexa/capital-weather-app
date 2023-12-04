import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CapitalComponent } from './capital.component';
import { StoreModule } from '@ngrx/store';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { WeatherComponent } from '../weather/weather.component';
import { ForecastComponent } from '../forecast/forecast.component';

describe('CapitalComponent', () => {
  let component: CapitalComponent;
  let fixture: ComponentFixture<CapitalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CapitalComponent,
        IconButtonComponent,
        WeatherComponent,
        ForecastComponent,
      ],
      imports: [StoreModule.forRoot({})],
    });

    fixture = TestBed.createComponent(CapitalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
