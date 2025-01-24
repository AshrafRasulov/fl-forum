import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatRippleModule} from "@angular/material/core";
import {MatTabsModule} from "@angular/material/tabs";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {map, Observable} from "rxjs";
import {Router} from "@angular/router";
import {HttpService} from "../../services/http.service";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {AdminService} from "../../services/admin.service";
import {AdminUsers} from "./admin-users/admin-users";
import {AdminPosts} from "./admin-posts/admin-posts";


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRippleModule,
    MatTabsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    AdminUsers,
    AdminPosts
  ],
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})


export class AdminHomeComponent {

  tab_index: number = 0;
  row: any;
  user_id: number;


  editForm: FormGroup = new FormGroup<any>({
    user_id: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    middle_name: new FormControl(''),
    status: new FormControl(''),
    is_admin: new FormControl(''),
  });

  constructor(
    private _router: Router,
    private _http: HttpService,
    private service: AdminService
  ) {}


}
