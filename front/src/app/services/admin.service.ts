import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpService) {
  }

  getUsers(): Observable<any> {
    return this.http.post({}, 'user/get_all')
  }

  getPosts(): Observable<any> {
    return this.http.post({}, 'post/get_posts')
  }

  setUserState(data){
    return this.http.post(data, 'user/set_user_status');
  }

  setPostState(data){
    return this.http.post(data, 'post/set_post_status');
  }

  userDelete(data){
    return this.http.post(data, 'user/delete_user_by_id');
  }
}
