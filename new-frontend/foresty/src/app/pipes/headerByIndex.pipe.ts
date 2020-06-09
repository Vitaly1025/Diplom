import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'headerByIndex'
})
export class HeaderByIndexPipe implements PipeTransform {

  transform(value: any, index?: any): any {
    return value[index].breed;
  }

}
