import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from "@angular/router";
import {HttpService} from "../../services/http.service";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatInputModule} from "@angular/material/input";
import {RegistrationService} from "../../services/registration.service";

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {MessageService} from "../../services/message.service";
import {UtilService} from "../../services/util.service";
import {GetUser} from "../../services/user.service";


@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatToolbarModule, MatTooltipModule, FormsModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  login: FormControl;
  first_name: FormControl;
  last_name: FormControl;
  middle_name: FormControl;
  email: FormControl;
  password: FormControl;
  confirm: FormControl;
  admin: FormControl;
  user = GetUser();


  constructor(private router: Router,
              private http: HttpService,
              private registrationService: RegistrationService,
              private util: UtilService
  ) {
  }

  ngOnInit() {
  }

  registrForm = new FormGroup({
      login: new FormControl('', [Validators.required]),
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      middle_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl('', [Validators.required]),
    }
  );


  register() {
    let formValue = this.registrForm.getRawValue();
    if (this.registrForm.controls['password'].value !== this.registrForm.controls['confirm'].value) {
      alert("Пароли не совпадают");
      return;
    }
    this.registrationService.saveUser(formValue).subscribe((res: any) => {
      if (res.success) {
        this.util.successMsg('Успешно Добавлено', 4000);
        this.router.navigate(['/auth']).finally();
      } else this.util.errorMsg(res.msg);
    });

  }

}



