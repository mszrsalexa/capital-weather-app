import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import {
  HttpClientModule,
  provideHttpClient,
  withJsonpSupport,
} from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { countryReducer } from './store/reducers/country.reducer';
import { CapitalsComponent } from './components/capitals/capitals.component';
import { CapitalComponent } from './components/capital/capital.component';
import { CountryEffects } from './store/effects/country.effects';
import { WeatherComponent } from './components/weather/weather.component';
import { IconComponent } from './components/icon/icon.component';
import { CelsiusPipe } from './shared/pipes/celsius.pipe';
import { WidgetComponent } from './components/widget/widget.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { GoogleMapsComponent } from './components/google-maps/google-maps.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { DisplayNamePipe } from './shared/pipes/display-name.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CapitalsComponent,
    CapitalComponent,
    WeatherComponent,
    IconComponent,
    CelsiusPipe,
    WidgetComponent,
    ForecastComponent,
    GoogleMapsComponent,
    IconButtonComponent,
    DisplayNamePipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    StoreModule.forRoot({
      countries: countryReducer,
    }),
    EffectsModule.forRoot([CountryEffects]),
    GoogleMapsModule,
    MatMenuModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  providers: [provideHttpClient(withJsonpSupport())],
  bootstrap: [AppComponent],
})
export class AppModule {}
