import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Url } from '../classes/globals';
import { TrialPlotCharacteristic } from '../model/trial-plot-characteristic';

@Injectable({
  providedIn: 'root'
})
export class TrialPlotService {

  constructor(private http: HttpClient) { }

  getTrialPlotInformationByTrialPlotId(id: number) {
    return this.http.get(Url + 'trialPlotInformationByTrialPlotId/' + id);
  }

  getTrialPlots() {
    return this.http.get(Url + 'trialPlots');
  }

  getAllCharacteristicsByTrialPlotId(id: number) {
    return this.http.get(Url + 'allCharacteristicsByTrialPlotId/' + id);
  }

  getAllTrialPlotCharacteristics() {
    return this.http.get<TrialPlotCharacteristic>(Url + 'allTrialPlotsCharacteristics/');
  }

}
