import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss',
})
export class IconButtonComponent<T> {
  @Input() type: string = '';
  @Input() fontSize?: number;
  @Input() color?: 'white' | 'green' | 'black';
  @Input() routerLink?: string;
  @Input() menuItems?: T[];
  @Input() selectedMenuItem?: T;
  @Input() selectedMenuItemIcon?: string;

  @Output() menuItemSelected: EventEmitter<T> = new EventEmitter<T>();

  onMenuItemClick(menuItem: T) {
    this.selectedMenuItem = menuItem;
    this.menuItemSelected.emit(menuItem);
  }
}
