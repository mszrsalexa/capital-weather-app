import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

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

@NgModule({
  declarations: [
    AppComponent,
    CapitalsComponent,
    CapitalComponent,
    WeatherComponent,
    IconComponent,
    CelsiusPipe,
    WidgetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    StoreModule.forRoot({
      countries: countryReducer,
    }),
    EffectsModule.forRoot([CountryEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
