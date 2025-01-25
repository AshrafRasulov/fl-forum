import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})


export class PostService {

  constructor(
    private http: HttpService
  ) {

  }

  savePost(data: any): Observable<any>{
    return this.http.post(data, 'post/save');
  }

  getPosts(): Observable<any>{
    return this.http.post({}, 'post/get_posts');
  }

  getPostsByUserId(idUser: number): Observable<any>{
    return this.http.post({}, `post/user/${idUser}`);
  }

  getPostById(id: number): Observable<any>{
    return this.http.post({id: id}, `post/get_post`);
  }

  deletePost(id: number): Observable<any>{
    return this.http.post({id}, `post/delete`)
  }

}
