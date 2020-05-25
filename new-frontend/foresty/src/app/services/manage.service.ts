import { Tree } from './../models/stationar';
import { TreeInfoRequest } from './../models/requests/treeinforequest';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { PlotInfoRequest } from '../models/requests/plotinforequest';
import { Plot } from '../models/stationar';
import { Subject } from 'rxjs';
import { BaseSpravochnik } from '../models/base.spravochnik';
import { LeshosResponse } from '../models/response/response.leshos';
import { LeshosSpravochnik } from '../models/response/lesnichspravochnik';
import { CreateLeshosRequest } from '../models/requests/create-leshos.request';

@Injectable({
  providedIn: 'root'
})
export class ManageService {
public plotInfo$ = new Subject<any>();
public leshosAll$ = new Subject<LeshosResponse[]>();

public lesnichSpravochniki$ = new Subject<LeshosSpravochnik[]>();
public forestType$ = new Subject<BaseSpravochnik[]>();

public get lesnichSpravochniki() {
  return this.lesnichSpravochniki$.asObservable();
}
public get forestTypes() {
  return this.forestType$.asObservable();
}
public get plotInfo() {
    return this.plotInfo$.asObservable();
}
public get leshosAll() {
  return this.leshosAll$.asObservable();
}
constructor(private http: HttpService) {  }

public GetAllLeshozes(){
    this.http.sendPostRequest('CRUD', 'getAllLeshozes', null)
    .subscribe(resp => { 
        this.leshosAll$.next(resp);
    });
  }

  public GetLesnichSpravochniki(){
    this.http.sendGetRequest('CRUD', 'getLesnichSpravochniki', null)
    .subscribe(resp => { 
        this.lesnichSpravochniki$.next(resp);
    });
  }
  public GetForestTypeSpravochniki(){
    this.http.sendGetRequest('CRUD', 'getForestTypes', null)
    .subscribe(resp => {
        this.forestType$.next(resp);
    });
  }
  public InsertLeshos(request: CreateLeshosRequest){
    this.http.sendPostRequest('CRUD', 'addLeshos', request)
    .subscribe(resp => {
       this.GetAllLeshozes();
    });
  }
  
  public ChangeLeshos(leshosId: number, request: CreateLeshosRequest){
    this.http.sendPostRequest('CRUD', `changeLeshos?leshosId=${leshosId}`, request)
    .subscribe(resp => {
       debugger;
       this.GetAllLeshozes();
    });
}

  public DeleteLeshos(leshosId: number){
      this.http.sendPostRequest('CRUD', `deleteLeshos?leshosId=${leshosId}`, null)
      .subscribe(resp => {
         debugger;
         this.GetAllLeshozes();
      });
  }
}
