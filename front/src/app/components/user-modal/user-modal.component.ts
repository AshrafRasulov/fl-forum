import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {TextFieldModule} from "@angular/cdk/text-field";
import {HttpService} from "../../services/http.service";
import {UtilService} from "../../services/util.service";
import {Observable} from "rxjs";
import {MatDialogModule} from "@angular/material/dialog";

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    TextFieldModule,
    MatDialogModule
  ],
  templateUrl: './user-modal.component.html',
})
export class UserModalComponent implements OnInit {
  userId: any = 0;
  dialog: any;
  user$: Observable<any>;

  constructor(
    private http: HttpService,
    private service: UtilService
  ) {

  }

  ngOnInit(): void {
    if (this.userId > 0) this.user$ = this.service.getUserById(this.userId);
  }


}
