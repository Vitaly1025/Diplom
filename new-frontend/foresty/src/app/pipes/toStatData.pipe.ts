import { Pipe, PipeTransform } from '@angular/core';
import { Stat } from '../models/general';

@Pipe({
  name: 'toStatData'
})
export class ToStatDataPipe implements PipeTransform {

  transform(value: Stat, args?: any): any {
    if(!args){
      if(value.OS){
        return [{  
          data: [value.B.toFixed(2)],
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
          data: [value.E.toFixed(2)],
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
          data: [value.OS.toFixed(2)],
          backgroundColor: "rgb(165,166,168)",
          label: 'Осина',
          barThickness: 20, 
          maxBarThickness: 25 ,
          borderColor: "rgb(165,166,168)",
          borderWidth: 2,
          hoverBorderColor: "rgb(255,255,255)",
          hoverBackgroundColor: "rgba(58,123,172,1)"
        },
        {  
          data: [value.S.toFixed(2)],
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
      return [{  
        data: [value.B.toFixed(2)],
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
        data: [value.E.toFixed(2)],
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
        data: [value.S.toFixed(2)],
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
