import { Pipe, PipeTransform } from '@angular/core';
import { Stat } from '../models/general';

@Pipe({
  name: 'toStatData'
})
export class ToStatDataPipe implements PipeTransform {

  transform(value: Stat, args?: any): any {
    if(!args){
      return [{  
        data: [value.Б.toFixed(2)],
        backgroundColor: "rgba(179,150,78,1)",
        label: 'Берёза',
        barThickness: 20, 
        maxBarThickness: 25 ,
        borderColor: "rgb(255,255,255)",
        borderWidth: 2,
        hoverBorderColor: "rgb(255,255,255)",
        hoverBackgroundColor: "rgba(183,150,78,1)"
      },
      {  
        data: [value.Е.toFixed(2)],
        backgroundColor: "rgba(58,123,167,1)",
        label: 'Ель',
        barThickness: 20, 
        maxBarThickness: 25 ,
        borderColor: "rgb(255,255,255)",
        borderWidth: 2,
        hoverBorderColor: "rgb(255,255,255)",
        hoverBackgroundColor: "rgba(58,123,172,1)"
      },
      {  
        data: [value.С.toFixed(2)],
        backgroundColor: "rgba(179,85,105,1)",
        label: 'Сосна',
        barThickness: 20, 
        maxBarThickness: 25 ,
        borderColor: "rgb(255,255,255)",
        borderWidth: 2,
        hoverBorderColor: "rgb(255,255,255)",
        hoverBackgroundColor: "rgba(184,85,105,1)"
      }];
    }
    else{
      return ['B','E','C']
    }
  }

}
