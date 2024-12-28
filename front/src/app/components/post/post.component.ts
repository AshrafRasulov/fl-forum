import { AsyncPipe, NgIf, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    MatRippleModule,
    MatToolbarModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    AsyncPipe,
    NgIf,
    NgForOf
  ],
})
export class PostComponent implements OnInit {
  constructor(
    private _router: Router,
    private _http: HttpService
  ){}

  info$: Observable<any> = this.getInfo();
  
  ngOnInit(){
    console.log('i am born');
    this.getInfo();
  }

  navigate(url: string, replaceUrl: boolean): void {
    this._router.navigate([`/${url}`], {replaceUrl: replaceUrl}).finally();
  }


  getInfo(): Observable<any> {
    return this._http.post({}, 'post/get_posts')
      .pipe(map(m => {
        console.log(m);
        if (m.success) {
          return m.obj;
        }
        else {
          this._http.errorMsg(m.msg);
          return [];
        }
      }));
  }

}
