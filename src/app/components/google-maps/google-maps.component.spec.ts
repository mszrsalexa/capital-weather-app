import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleMapsComponent } from './google-maps.component';
import { GoogleMap } from '@angular/google-maps';
import { StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GoogleMapsComponent', () => {
  let component: GoogleMapsComponent;
  let fixture: ComponentFixture<GoogleMapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoogleMapsComponent, GoogleMap],
      imports: [StoreModule.forRoot({}), HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(GoogleMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
