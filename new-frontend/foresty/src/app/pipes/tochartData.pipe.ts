import { SingleDataSet } from 'ng2-charts';
import { Pipe, PipeTransform } from '@angular/core';
import { BreedStat } from '../models/general';

@Pipe({
  name: 'tochartData'
})
export class TochartDataPipe implements PipeTransform {

  transform(value: BreedStat[], args?: any): any {
    if(!args){
      return value.map(t => t.procent)
    }
    else{
      return value.map(t => t.breed)
    }
  }

}
