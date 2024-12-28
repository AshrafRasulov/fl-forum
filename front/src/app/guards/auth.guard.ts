import {ActivatedRouteSnapshot, createUrlTreeFromSnapshot, UrlTree,} from '@angular/router';
import {jwtDecode, JwtPayload} from 'jwt-decode';
import {HttpService} from "../services/http.service";
import {inject} from "@angular/core";

export const AuthGuard = (next: ActivatedRouteSnapshot): UrlTree | boolean => {
  const navigate:UrlTree = createUrlTreeFromSnapshot(next, ['/', 'auth']);
  const user: string | null = localStorage.getItem('user');
  const http: HttpService = inject(HttpService);
  const errMsg = () => http.errorMsg('AuthGuard - Авторизуйтесь');
  if (user) {
    try{
      const token: any = localStorage.getItem('token');
      if (!(!!token)) {
        errMsg();
        return navigate;
      }
      const decode: JwtPayload = jwtDecode(token);
      const time: number = decode.exp ? decode.exp : 0;
      if (time === 0 ) {
        errMsg();
        return navigate;
      }
      if (new Date(time * 1000) > new Date()) return true;
      else {
        errMsg();
        return navigate;
      }
    } catch (e) {
      errMsg();
      return navigate;
    }
  }
  errMsg();
  return navigate;
};



