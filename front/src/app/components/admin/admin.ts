import {Component} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {MatIconModule} from "@angular/material/icon";
import {MatRippleModule} from "@angular/material/core";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.html',
  styleUrls: ['./admin.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    MatRippleModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatInputModule,
    NgIf
  ]
})

export class Admin {

  constructor(
      private http: HttpService,
      private route: Router
    )
  { }


  form: FormGroup = new FormGroup({
    login: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required)
  });
  subs: Subscription = new Subscription();
  adminForm: FormGroup;



  onReg(): void {
    this.route.navigate([`${'registration'}`]);
  }

  onLogin(): void {
    this.form.markAllAsTouched();
    this.subs.add(this.http.post(this.form.getRawValue(), 'auth')
      .subscribe(s => {
        if (s.success) {
          localStorage.setItem('token', s.token);
          localStorage.setItem('user', JSON.stringify(s.user));
          this.navigate('main', true)
        } else this.http.errorMsg('Неверный логин или пароль');
      }))
  }

  navigate(url: string, replaceUrl: boolean = false): void{
    this.route.navigate([`/${url}`], {replaceUrl: replaceUrl}).finally();
  }


  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }


}
