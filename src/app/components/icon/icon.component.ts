import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
})
export class IconComponent {
  @Input() type: string | undefined;
  @Input() size: string | undefined;
  @Input() color: string | undefined;
}
