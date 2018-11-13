import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monto'
})
export class MontoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value !== undefined && value !== null) {
      return value.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else {
      return '';
    }
  }

}
