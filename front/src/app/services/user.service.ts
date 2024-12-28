import {User} from '../model/user';
import {HttpHandlerFn, HttpInterceptorFn} from '@angular/common/http';

export function GetUser(): User {
  const user: User = new User();
  const obj = JSON.parse(localStorage.getItem('user') ?? '{}');
  if (obj && Object.keys(obj).length > 0 && obj.user_id > 0) {
    user.first_name = obj.first_name;
    user.middle_name = obj.middle_name;
    user.last_name = obj.last_name;
    user.roles = obj.roles ?? [];
    user.user_id = obj.user_id;
  }
  return user;
}

export const TokenInterceptor: HttpInterceptorFn = (req, next: HttpHandlerFn) => {
  const token: string | null | undefined = localStorage.getItem('token');
  return !!token
    ? next(req.clone({headers: req.headers.set('Authorization', `Bearer ${token}`)}))
    : next(req);
};
