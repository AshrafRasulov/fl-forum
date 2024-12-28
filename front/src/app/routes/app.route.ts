import {Routes} from "@angular/router";
import {Main} from '../components/main/main';
import {AuthGuard} from "../guards/auth.guard";

export const APP_ROUTES: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('../components/auth/auth').then(t => t.Auth)
  },
  {
    path: 'example',
    loadComponent: () => import('../components/example/example').then(t => t.Example)
  },{
    path: 'comment',
    loadComponent: ()=> import('../components/comment/comment.component')
    .then(t => t.CommentComponent)
  },
  {
    path: 'post',
    loadComponent: () => import('../components/post/post.component').then(t => t.PostComponent)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadComponent: () => import('../components/admin/admin').then(t => t.Admin)
  },
  {
    path: 'main',
    component: Main
  },
  { path: '', redirectTo: 'main', pathMatch: 'full'},
  { path: '**', redirectTo: 'main', pathMatch: 'full'},
];
