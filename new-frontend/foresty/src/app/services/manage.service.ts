import { CreateTreePropertyRequest } from './../models/requests/create-treeproperty.request';
import { CreateTreetRequest } from './../models/requests/create-tree.request';
import { CreateTrialPlotRequest } from './../models/requests/create-trialplot.request';
import { TreeProperty } from './../models/response/response.tree-property';
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
import { TrialPlot } from '../models/response/response.trialplots';

@Injectable({
  providedIn: 'root'
})
export class ManageService {
public plotInfo$ = new Subject<any>();
public tumSP$ = new Subject<any>();
public leshosAll$ = new Subject<LeshosResponse[]>();
public trialPlotAll$ = new Subject<TrialPlot[]>();
public treeAll$ = new Subject<Tree[]>();
public propertyAll$ = new Subject<TreeProperty[]>();

public lesnichSpravochniki$ = new Subject<LeshosSpravochnik[]>();
public forestType$ = new Subject<BaseSpravochnik[]>();
public breedType$ = new Subject<any[]>();
public craftType$ = new Subject<any[]>();
public suitType$ = new Subject<any[]>();


public get craftTypes() {
  return this.craftType$.asObservable();
}
public get suitTypes() {
  return this.suitType$.asObservable();
}

public get lesnichSpravochniki() {
  return this.lesnichSpravochniki$.asObservable();
}
public get tumSP() {
  return this.tumSP$.asObservable();
}
public get forestTypes() {
  return this.forestType$.asObservable();
}
public get breedTypes() {
  return this.breedType$.asObservable();
}
public get plotInfo() {
    return this.plotInfo$.asObservable();
}
public get leshosAll() {
  return this.leshosAll$.asObservable();
}
public get trialPlotAll() {
  return this.trialPlotAll$.asObservable();
}
public get treeAll() {
  return this.treeAll$.asObservable();
}

public get propertyAll() {
  return this.propertyAll$.asObservable();
}

constructor(private http: HttpService) {  }

public GetAllLeshozes(){
    this.http.sendPostRequest('CRUD', 'getAllLeshozes', null)
    .subscribe(resp => { 
        this.leshosAll$.next(resp);
    });
  }

  public GetTrialPlots(){
    this.http.sendPostRequest('CRUD', 'getAllTrialPlots', null)
    .subscribe(resp => { 
        this.trialPlotAll$.next(resp);
    });
  }

  public GetTrees(){
    this.http.sendPostRequest('CRUD', 'getAllTree', null)
    .subscribe(resp => { 
        this.treeAll$.next(resp);
    });
  }

  public GetTreeProperty(){
    this.http.sendPostRequest('CRUD', 'getTreeProperties', null)
    .subscribe(resp => { 
        this.propertyAll$.next(resp);
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
  public GetTum(){
    this.http.sendGetRequest('CRUD', 'getTum', null)
    .subscribe(resp => {
        this.tumSP$.next(resp);
    });
  }

  public GetSuit(){
    this.http.sendGetRequest('CRUD', 'getTechnSuit', null)
    .subscribe(resp => {
        this.suitType$.next(resp);
    });
  }

  public GetCraft(){
    this.http.sendGetRequest('CRUD', 'getCraftCategory', null)
    .subscribe(resp => {
        this.craftType$.next(resp);
    });
  }

  public GetBreed(){
    this.http.sendGetRequest('CRUD', 'getBreed', null)
    .subscribe(resp => {
        this.breedType$.next(resp);
    });
  }
  public InsertLeshos(request: CreateLeshosRequest){
    this.http.sendPostRequest('CRUD', 'addLeshos', request)
    .subscribe(resp => {
       this.GetAllLeshozes();
    });
  }

  public InsertTrialPlot(request: CreateTrialPlotRequest){
    this.http.sendPostRequest('CRUD', 'addTrialplot', request)
    .subscribe(resp => {
       this.GetTrialPlots();
    });
  }

  public InsertTree(request: CreateTreetRequest){
    this.http.sendPostRequest('CRUD', 'addTree', request)
    .subscribe(resp => {
       this.GetTrees();
    });
  }

  public InsertTreeProperty(request: CreateTreePropertyRequest){
    this.http.sendPostRequest('CRUD', 'addTreeProp', request)
    .subscribe(resp => {
       this.GetTrees();
    });
  }
  
  public ChangeLeshos(leshosId: number, request: CreateLeshosRequest){
    this.http.sendPostRequest('CRUD', `changeLeshos?leshosId=${leshosId}`, request)
    .subscribe(resp => {
       this.GetAllLeshozes();
    });
}

  public DeleteLeshos(leshosId: number){
      this.http.sendPostRequest('CRUD', `deleteLeshos?leshosId=${leshosId}`, null)
      .subscribe(resp => {
         this.GetAllLeshozes();
      });
  }
}
