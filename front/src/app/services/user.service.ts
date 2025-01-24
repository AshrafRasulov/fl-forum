import {User} from '../model/user';
import {HttpHandlerFn, HttpInterceptorFn} from '@angular/common/http';

export function GetUser(): User {
  const user: User = new User();
  const obj = JSON.parse(localStorage.getItem('user') ?? '{}');
  if (obj && Object.keys(obj).length > 0 && obj.user_id > 0) {
    user.user_id = obj.user_id;
    user.login = obj.login;
    user.password = obj.password;
    user.first_name = obj.first_name;
    user.last_name = obj.last_name;
    user.middle_name = obj.middle_name;
    user.state = obj.state;
    user.cr_by = obj.cr_by;
    user.cr_on = obj.cr_on;
    user.up_by = obj.up_by;
    user.up_on = obj.up_on;
    user.post_count = obj.post_count;
    user.message_count = obj.message_count;
    user.is_admin = obj.is_admin;

    // user.roles = obj.roles ?? [];
  }
  return user;
}

export const TokenInterceptor: HttpInterceptorFn = (req, next: HttpHandlerFn) => {
  const token: string | null | undefined = localStorage.getItem('token');
  return !!token
    ? next(req.clone({headers: req.headers.set('Authorization', `Bearer ${token}`)}))
    : next(req);
};


