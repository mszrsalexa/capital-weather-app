import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconButtonComponent } from './icon-button.component';
import { IconComponent } from '../icon/icon.component';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';
import { DisplayNamePipe } from '../../shared/pipes/display-name.pipe';

describe('IconButtonComponent', () => {
  let component: IconButtonComponent<any>;
  let fixture: ComponentFixture<IconButtonComponent<any>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IconButtonComponent, IconComponent, DisplayNamePipe],
      imports: [MatMenuModule, RouterTestingModule],
    });
    fixture = TestBed.createComponent(IconButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
