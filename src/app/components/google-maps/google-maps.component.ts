import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { selectActiveLocation } from '../../store/selectors/country.selectors';
import { Coordinates } from '../../models/country.model';
import { GoogleMapsService } from '../../services/google-maps.service';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
})
export class GoogleMapsComponent implements OnChanges {
  @Input() mapTypeId = 'roadmap';

  map: google.maps.Map | undefined;
  coordinates: Coordinates = { lat: 47.5, lng: 19.08 };
  apiLoaded$: Observable<boolean>;
  options: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 9,
    zoomControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeId: this.mapTypeId,
  };
  marker = {
    position: this.coordinates,
  };
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: {
      path: 'M 0,0 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0',
      fillColor: '#2c343c',
      fillOpacity: 0.7,
      strokeWeight: 0,
      scale: 2,
    },
    label: {
      text: 'location_on',
      fontFamily: 'Material Symbols Outlined',
      color: '#fefefe',
      fontSize: '24px',
    },
  };

  constructor(
    private store: Store,
    private googleMapsService: GoogleMapsService
  ) {
    this.store
      .pipe(select(selectActiveLocation), take(1))
      .subscribe((coordinates) => {
        if (coordinates) {
          this.coordinates = coordinates;
          this.options.center = this.coordinates;
          this.marker.position = this.coordinates;
        }
      });

    this.apiLoaded$ = this.googleMapsService.isApiLoaded();
  }

  onMapReady(map: google.maps.Map): void {
    this.map = map;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.map &&
      changes['mapTypeId'] &&
      changes['mapTypeId'].currentValue !== changes['mapTypeId'].previousValue
    ) {
      this.options.mapTypeId = changes['mapTypeId'].currentValue;
      this.map.setMapTypeId(changes['mapTypeId'].currentValue);
    }
  }
}
