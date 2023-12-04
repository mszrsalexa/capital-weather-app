import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'celsius',
})
export class CelsiusPipe implements PipeTransform {
  transform(value: number | string | undefined): string {
    if (value === null || value === undefined) {
      return '';
    }

    const floatValue: number = parseFloat(value.toString());
    const intValue: number = Math.round(floatValue);

    return !isNaN(intValue) ? `${intValue}°` : `${value}°`;
  }
}
