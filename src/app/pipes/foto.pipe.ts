import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'foto'
})
export class FotoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      return "https://www.123depositos.com/transferencias_rest/uploads/" + value;
    } else {
      return null;

    }
  }

}
