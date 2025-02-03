import {Component, OnInit} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatRippleModule} from "@angular/material/core";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {map, Observable} from "rxjs";
import {Router} from "@angular/router";
import {HttpService} from "../../../services/http.service";
import {AdminService} from "../../../services/admin.service";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'admin-users',
  templateUrl: 'admin-users.html',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatRippleModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatInputModule,
    NgIf,
    AsyncPipe,
    MatCheckboxModule,
    NgForOf
  ]
})
export class AdminUsers implements OnInit {
  users$: Observable<any> = this.getUsers();

  constructor(
    private _router: Router,
    private _http: HttpService,
    private service: AdminService) {
  }

  ngOnInit():void{
    this.getUsers();
  }

  getUsers(){
    return this.service.getUsers().pipe(map(m => {
      if (m.success) {
        return m.obj;
      }
      else {
        this._http.errorMsg(m.msg);
        return [];
      }
    }));
  }

  trackBy = (index: number, item: any): string => `${index}_${item.example_id}`;

  setUserStatus(user) {
    this.service.setUserState(user).subscribe((res: any) =>
    {
      if (res.success) {
        this._http.successMsg('Успешно сохранено', 4000);
        this.getUsers();
      }
      else this._http.errorMsg(res.msg);
    });
  }

  userDelete(data) {
    this.service.userDelete(data).subscribe((res: any) =>
    {
      if (res.success) {
        this._http.successMsg('Успешно сохранено', 4000);
        this.users$ = this.getUsers();
      }
      else this._http.errorMsg(res.msg);
    });

  }
}
