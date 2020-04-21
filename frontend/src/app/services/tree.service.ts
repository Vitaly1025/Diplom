import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Url } from 'src/app/classes/globals';


@Injectable({
  providedIn: 'root'
})
export class TreeService {

  constructor(private http: HttpClient) { }

  getTreesByTrialPlotCharacteristicIdAndYear(year: number, id: number) {
    return this.http.get(Url + 'treesByTrialPlotCharacteristicIdAndYear/' + year + '/' + id);
  }

  getTree(id: number) {
    return this.http.get(Url + 'trees/' + id);
  }

  getDataTreesForGraph(id: number, path: string) {
    return this.http.get(Url + path + id);
  }

}
