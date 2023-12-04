import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CapitalsComponent } from './capitals.component';
import { StoreModule } from '@ngrx/store';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { WidgetComponent } from '../widget/widget.component';
import { DisplayNamePipe } from '../../shared/pipes/display-name.pipe';
import { IconComponent } from '../icon/icon.component';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';

describe('CapitalsComponent', () => {
  let component: CapitalsComponent;
  let fixture: ComponentFixture<CapitalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CapitalsComponent,
        IconButtonComponent,
        WidgetComponent,
        DisplayNamePipe,
        IconComponent,
      ],
      imports: [StoreModule.forRoot({}), MatMenuModule, RouterTestingModule],
    });

    fixture = TestBed.createComponent(CapitalsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
