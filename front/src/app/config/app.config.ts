import {ApplicationConfig, Title} from '@angular/platform-browser';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideHttpClient, withInterceptors, withInterceptorsFromDi} from '@angular/common/http';
import {provideRouter, withHashLocation} from '@angular/router';
import {APP_ROUTES} from '../routes/app.route';
import {TokenInterceptor} from "../services/user.service";
import {LOCALE_ID} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";

export const appConfig: ApplicationConfig = {
  providers: [
    MatSnackBar,
    { provide: LOCALE_ID, useValue: 'ru-RU' },
    Title,
    provideRouter(APP_ROUTES,withHashLocation()),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi(), withInterceptors([TokenInterceptor]))
  ]
}

