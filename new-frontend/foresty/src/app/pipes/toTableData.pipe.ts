import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toTableData'
})
export class ToTableDataPipe implements PipeTransform {

  transform(value: any, key?: any,index?: any): any {
    console.log(index);
    if(index !== undefined){
      return value[key][index].count;
    }
    return value[key];
  }

}
