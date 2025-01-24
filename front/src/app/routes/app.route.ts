import {Routes} from "@angular/router";
import {AuthGuard} from "../guards/auth.guard";

export const APP_ROUTES: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('../components/auth/auth').then(t => t.Auth)
  },
  {
    path: 'admin',
    loadComponent: () => import('../components/admin-home/admin-home.component').then(t => t.AdminHomeComponent)
  },
  {
    path: 'registration',
    loadComponent: () => import('../components/registration/registration.component').then(t => t.RegistrationComponent)
  },
  {
    path: 'admin-home',
    loadComponent: () => import('../components/admin-home/admin-home.component').then(t => t.AdminHomeComponent)
  },
  {
    path: 'example',
    loadComponent: () => import('../components/example/example').then(t => t.Example)
  },
  {
    path: 'comment',
    loadComponent: () => import('../components/comment/comment.component')
      .then(t => t.CommentComponent)
  },
  {
    path: 'post',
    canActivate: [AuthGuard],
    loadComponent: () => import('../components/home/home').then(t => t.Home)
  },
  {
    path: 'post/:id',
    canActivate: [AuthGuard],
    loadComponent: () => import('../components/post/post').then(t => t.Post)
  },
  {
    path: 'post/user/:id',
    canActivate: [AuthGuard],
    loadComponent: () => import('../components/home/home').then(t => t.Home)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadComponent: () => import('../components/admin/admin').then(t => t.Admin)
  },
  {
    path: 'main',
    canActivate: [AuthGuard],
    loadComponent: () => import('../components/home/home').then(t => t.Home)
  },
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: '**', redirectTo: 'main', pathMatch: 'full'},
];
