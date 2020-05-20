import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, of } from 'rxjs';
import { map, take, catchError } from 'rxjs/operators';
import { AppConfigService } from "./config.service";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient, private appConfig: AppConfigService) { }
  public loading$ = new Subject<boolean>();

  public get ShowLoader(){
      return this.loading$.asObservable();
  }

  public sendPostRequest(controller: string, method: string, body: any, showLoading: boolean  = true): Observable<any> {
      showLoading ? this.loading$.next(true) : null;
      return this.http
          .post(`${this.appConfig.getApiUrls}/${controller}/${method}`, body).pipe(
              catchError(err => of([])),
              take(1),
              map((response: any) => {
                  showLoading ? this.loading$.next() : null;
                  return response;
              })
          );
  }
  public sendGetRequest(controller: string, method: string, params: any, showLoading: boolean  = true): Observable<any> {
      showLoading ? this.loading$.next(true) : null;
      return this.http
          .get(`${this.appConfig.getApiUrls}/${controller}/${method}`).pipe(
              catchError(err => of(console.log(err))),
              take(1),
              map((response: any) => {
                  showLoading ? this.loading$.next() : null;
                  return response;
              })
          );
  }
}
