import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private http: HttpService
  ) {

  }

  saveMessage(data: any){
    return this.http.post(data, 'message/save');
  }

  deleteMessage(id: number): Observable<any>{
    return this.http.post({id}, `message/delete`)
  }
}
