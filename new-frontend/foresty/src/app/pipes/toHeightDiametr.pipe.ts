import { DependencyGraph } from './../models/stationar';
import { ChartPoint } from 'chart.js';
import { SingleDataSet } from 'ng2-charts';
import { Pipe, PipeTransform } from '@angular/core';
import { BreedStat } from '../models/general';
import { Tree, PorodaZnach, LineChartData } from '../models/stationar';

@Pipe({
  name: 'toHeightDiametr'
})
export class ToHeightDiametr implements PipeTransform {

  transform(value: Tree[], poroda?: any, dep?: DependencyGraph): any {
    
    
    if(poroda)
    {
        let breed = poroda as PorodaZnach == 1 ? 'B': poroda as PorodaZnach == 2 ? 'S' : 'E';
        let breedName = poroda as PorodaZnach == 1 ? 'Берёза': poroda as PorodaZnach == 2 ? 'Сосна' : 'Ель';
        if(dep == DependencyGraph.HeightBeginKronDiametr){
        return [{
            label: breedName,
            borderColor: "rgba(33,80,36,0.8)",
            pointBackgroundColor: "rgba(33,80,36,0.8)",
            fill: false,    
            data: value.filter(t => t.idBreedNavigation.cipher == breed).map(t => t.yearProperty[0]).map(y => new Object({x: y.treeProperty.height , y: (y.treeProperty.diametrNs + y.treeProperty.diametrWe) / 2}))
        }];
    }
    else if(dep == DependencyGraph.HeightDiametr){
        return [{
            label: breedName,
            borderColor: "rgba(33,80,36,0.8)",
            pointBackgroundColor: "rgba(33,80,36,0.8)",
            fill: false,    
            data: value.filter(t => t.idBreedNavigation.cipher == breed).map(t => t.yearProperty[0]).map(y => new Object({x: y.treeProperty.crownLength , y: (y.treeProperty.diametrNs + y.treeProperty.diametrWe) / 2}))
        }];
    }
    else if(dep == DependencyGraph.MaxDiametrDiametr){
        return [{
            label: breedName,
            borderColor: "rgba(33,80,36,0.8)",
            pointBackgroundColor: "rgba(33,80,36,0.8)",
            fill: false,    
            data: value.filter(t => t.idBreedNavigation.cipher == breed).map(t => t.yearProperty[0]).map(y => new Object({x: y.treeProperty.heightNaibDiametra , y: (y.treeProperty.diametrNs + y.treeProperty.diametrWe) / 2}))
        }];
    }
    }
  }

}
