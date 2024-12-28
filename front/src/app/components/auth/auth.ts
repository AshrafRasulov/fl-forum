import {Component, OnDestroy} from '@angular/core';
import {MatRippleModule} from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpService} from '../../services/http.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.html',
  styleUrls: ['./auth.scss'],
  imports: [
    MatRippleModule,
    MatTooltipModule,
    MatIconModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule
  ],
  standalone: true
})
export class Auth implements OnDestroy{
  form: FormGroup = new FormGroup({
    login: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required)
  });
  subs: Subscription = new Subscription();

  constructor(
    private _http: HttpService,
    private _route: Router,
  ) {
    localStorage.clear();
  }

  onReg(): void {
    console.log('reg click')
  }

  onLogin(): void {
    this.form.markAllAsTouched();
    this.subs.add(this._http.post(this.form.getRawValue(), 'auth')
      .subscribe(s => {
        if (s.success) {
          localStorage.setItem('token', s.token);
          localStorage.setItem('user', JSON.stringify(s.user));
          this.navigate('main', true)
        } else this._http.errorMsg('Неверный логин или пароль');
      }))
  }

  navigate(url: string, replaceUrl: boolean = false): void{
    this._route.navigate([`/${url}`], {replaceUrl: replaceUrl}).finally();
  }


  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

