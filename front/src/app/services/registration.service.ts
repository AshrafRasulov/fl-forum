import {Observable} from "rxjs";
import {HttpService} from "./http.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class RegistrationService{
  constructor(
    private http: HttpService
  ) {
  }
  saveUser(data: any): Observable<any>{
    return this.http.post(data, 'auth/register');
  }

  getUser(data: any): Observable<any>{
    return this.http.post(data, 'user/get_users');
  }
}
