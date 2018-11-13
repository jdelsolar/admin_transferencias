import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tasa'
})
export class TasaPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
