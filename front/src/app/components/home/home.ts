import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {Router, RouterLink} from '@angular/router';
import {filter, map, Observable} from 'rxjs';
import {PostService} from 'src/app/services/post.service';
import {UtilService} from 'src/app/services/util.service';
import {MatDialog} from "@angular/material/dialog";
import {SavePost} from "../post/save-post";

@Component({
  selector: 'app-post',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
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
    NgForOf,
    RouterLink
  ],
})
export class Home implements OnInit {
  postComment = new FormControl('postComment');
  showAdd!: boolean;
  showEdit!: boolean;

  constructor(
    private router: Router,
    private service: PostService,
    private util: UtilService,
    private fb: FormBuilder,
    private modal: MatDialog
  ) {
  }

  info$: Observable<any> = this.getInfo();

  ngOnInit() {
    this.getInfo();
  }

  navigate(url: string, replaceUrl: boolean): void {
    this.router.navigate([`/${url}`], {replaceUrl: replaceUrl}).finally();
  }

  getInfo(): Observable<any> {
    return this.service.getPosts().pipe(map(m => {
      if (m.success) {
        console.log(m);
        return m.obj.filter(p=> p.status == 1);
      } else {
        this.util.errorMsg(m.msg);
        return [];
      }
    })
      //, filter(p => p.status == 1)
    );
  }

  getUserPostsById(id: number) {
    try {
      this.service.getPostsByUserId(id).pipe((postData) => {
        return postData;
      });
    } catch (e) {
      console.error(e);
    }
  }

  postAnswerAdd() {


  }

  postAnswerEdit() {
    console.log("Edit new answer: " + this.postComment.value);
  }

  postAnswerRemove() {

    console.log("Remove answer: " + this.postComment.value);
  }


  addPost() {
    const m = this.modal.open(
      SavePost,
      {width: '900px', height: '580px'}
    );
    m.componentInstance.dialog = m;
    m.afterClosed().subscribe(d => {
      if (d) this.info$ = this.getInfo();

    });
  }
}
