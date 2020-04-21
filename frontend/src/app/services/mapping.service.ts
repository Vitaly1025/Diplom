import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Map } from '../model/map';
import { Url } from '../classes/globals';

@Injectable({
  providedIn: 'root'
})
export class MappingService {

  constructor(private http: HttpClient) { }

  getTreeCoordinatesWithBoreDiameterByTrialPlotCharacteristicId(id: number) {
    return this.http.get<Map[]>(Url + 'treeCoordinatesWithBoreDiameterByTrialPlotCharacteristicId/' + id);
  }

  getTreeCoordinatesWithCrownDiameterByTrialPlotCharacteristicId(id: number) {
    return this.http.get<Map[]>(Url + 'treeCoordinatesWithCrownDiameterByTrialPlotCharacteristicId/' + id);
  }

}
