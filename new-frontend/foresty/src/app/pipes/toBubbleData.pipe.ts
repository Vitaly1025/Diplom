import { MapType } from './../models/stationar';
import { Tree, BubbleChartData } from '../models/stationar';
import { Pipe, PipeTransform } from '@angular/core';
import { ChartData, ChartPoint } from 'chart.js';

@Pipe({
  name: 'toBubbleData'
})

export class ToBubbleDataPipe implements PipeTransform {

  transform(value: Tree[], args?: any): any {
    if(args as MapType === MapType.BubbleCrown){
      let specialArray = [];
      const groupedMap = value.reduce(
        (entryMap, e) => entryMap.set(e.idBreedNavigation.name, [...entryMap.get(e.idBreedNavigation.name)||[], e]),
        new Map()
    );      
      groupedMap.forEach(treeGroup =>{
          specialArray.push(
            {
              label: treeGroup.map(t => t.idBreedNavigation.name)[0],
              data: treeGroup.map(t => (new BubbleChartData(t.x, t.y, t.yearProperty.length > 0 ? ((t.yearProperty[0].treeProperty.crownDiametrNs + t.yearProperty[0].treeProperty.crownDiametrWe) / 2 as any).toFixed(2) * 5 : 1, t.number))),
              backgroundColor: treeGroup.map(t => t.idBreedNavigation.cipher)[0] == 'S' ? 'rgba(197,225,165,0.7)': treeGroup.map(t => t.idBreedNavigation.cipher)[0] == 'B'?  '#212121' : 'rgba(27,94,32,0.7)'
            }
          )
      });
      return specialArray;
    }
    else if (args as MapType === MapType.BubbleStvol){
      let specialArray = [];
      const groupedMap = value.reduce(
        (entryMap, e) => entryMap.set(e.idBreedNavigation.name, [...entryMap.get(e.idBreedNavigation.name)||[], e]),
        new Map()
    );      
      groupedMap.forEach(treeGroup =>{
          specialArray.push(
            {
              label: treeGroup.map(t => t.idBreedNavigation.name)[0],
              data: treeGroup.map(t => (new BubbleChartData(t.x, t.y, t.yearProperty.length > 0 ? ((t.yearProperty[0].treeProperty.diametrNs + t.yearProperty[0].treeProperty.diametrWe) / 20 as any).toFixed()  : 1, t.number))),
              backgroundColor: treeGroup.map(t => t.idBreedNavigation.cipher)[0] == 'S' ? '#c5e1a5': treeGroup.map(t => t.idBreedNavigation.cipher)[0] == 'B'?  '#212121' : '#1b5e20'
            }
          )
      });
      return specialArray;
    }
  }

}