import { Pipe, PipeTransform } from '@angular/core';
import namings from '../namings.json';

@Pipe({
  name: 'displayName',
})
export class DisplayNamePipe implements PipeTransform {
  private displayNames: { [key: string]: string } = namings;

  transform(value: string): string {
    return this.displayNames[value] || value;
  }
}
