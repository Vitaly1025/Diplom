import { Tree, PlotInfo } from './../models/stationar';
import { TreeInfoRequest } from './../models/requests/treeinforequest';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { PlotInfoRequest } from '../models/requests/plotinforequest';
import { Plot } from '../models/stationar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StationarService {
public plotInfo$ = new Subject<Plot>();
public treeInfo$ = new Subject<Tree>();
public separatedplotInfo$ = new Subject<PlotInfo>();

public get plotInfo() {
    return this.plotInfo$.asObservable();
}
public get separatedplotInfo() {
  return this.separatedplotInfo$.asObservable();
}
public get treeInfo() {
  return this.treeInfo$.asObservable();
}
constructor(private http: HttpService) {  }

public GetPlotInfo(idLeshos: number, plotNumber: number){
  this.http.sendPostRequest('ConstantTrialPlot', 'getPlotInfo', ({ Id: idLeshos, PlotNumber: plotNumber }) as PlotInfoRequest)
  .subscribe(resp => { 
      this.plotInfo$.next(resp);
  });
}
public GetSeparetedPlotInfo(idLeshos: number, plotNumber: number){
  this.http.sendGetRequest('ConstantTrialPlot', `getSeparatedPlotInfo/?id=${idLeshos}&number=${plotNumber}`, null)
  .subscribe(resp => { 
      this.separatedplotInfo$.next(new PlotInfo(resp));
  });
}
public GetTreeInfo(idLeshos: number, plotNumber: number, treeNumber: number){
  this.http.sendPostRequest('ConstantTrialPlot', 'getTreeInfo', ({ Id: idLeshos, PlotNumber: plotNumber, TreeNumber: treeNumber }) as TreeInfoRequest)
  .subscribe(resp => { 
    
    this.treeInfo$.next(resp);
      // this.plotInfo$.next(resp);
  });
}

}
