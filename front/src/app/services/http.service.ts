import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class HttpService {
  private _http: HttpClient = inject(HttpClient)
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  private headers:HttpHeaders = new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append('Cache-control', 'no-cache');

  public static getServerUrl(): string {
    return `http://localhost:8888/`;
  }

  post<T = any>(data: {} = {}, url: string):Observable<T> {
    return this._http.post<T>(HttpService.getServerUrl() + url, data,
      {headers: this.headers});
  }

  get<T = any>(url: string):Observable<T> {
    return this._http.get<T>(HttpService.getServerUrl() + url,
      {headers: this.headers});
  }

  postFile<T = any>(formData: FormData, url: string): Observable<HttpEvent<T>> {
    return this._http.post<T>(HttpService.getServerUrl() + url, formData, {
      reportProgress: true,
      observe: 'events'
    });

  }

  errorMsg(msg: string, duration: number = 30000): void{
    this._snackBar.open(msg, undefined,
      {
        duration:duration,
        verticalPosition: 'top',
        panelClass: 'panel-error'
      });
  }

  successMsg(msg: string, duration: number = 5000): void{
    this._snackBar.open(msg, undefined,
      {
        duration:duration,
        verticalPosition: 'top'
      });
  }
}

