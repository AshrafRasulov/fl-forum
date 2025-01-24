import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";

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
}
