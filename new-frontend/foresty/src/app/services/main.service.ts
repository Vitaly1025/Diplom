import { Leshos } from './../models/general';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  public leshozes$ = new Subject<Leshos[]>();


  public get leshozesList() {
    return this.leshozes$.asObservable();
  }

  constructor(private http: HttpService) {  }
  
  public getSelectdLeshoz(plotId: number){
    this.http.sendGetRequest('ConstantTrialPlot', `getInfoAllLeshozes/${plotId}`, null)
    .subscribe(resp => { 
      this.leshozes$.next(resp)
    });
}  

  public getAllLeshozes(){
      this.http.sendGetRequest('ConstantTrialPlot', 'getInfoAllLeshozes', null)
      .subscribe(resp => { 
        this.leshozes$.next(resp)
      });
  }  
}
