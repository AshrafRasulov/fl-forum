import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpService) {

  }

  getCategories(): Observable<any>{
    return this.http.post({}, `category/all`).pipe(map(c=> c.obj));
  }
}
