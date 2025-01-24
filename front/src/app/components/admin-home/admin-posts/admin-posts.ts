import {Component} from '@angular/core';
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

@Component({
  selector: 'admin-posts',
  templateUrl: 'admin-posts.html',
  standalone: true,
  imports: [
    MatIconModule,
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
export class AdminPosts {
  posts$: Observable<any> = this.getPosts();

  constructor(
    private _router: Router,
    private _http: HttpService,
    private service: AdminService) {
  }

  getPosts(): Observable<any> {
    return this.service.getPosts().pipe(map(m => {
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

  setPostStatus(post) {
    this.service.setPostState(post).subscribe((res: any) =>
    {
      if (res.success) {
        this._http.successMsg('Успешно сохранено', 4000);
        this.getPosts();
      }
      else this._http.errorMsg(res.msg);
    });
  }
}
