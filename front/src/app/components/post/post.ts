import {Component, OnInit} from '@angular/core';
import {AsyncPipe, CommonModule, NgForOf, NgIf} from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTabsModule} from "@angular/material/tabs";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PostService} from "../../services/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {GetUser} from "../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {UserModalComponent} from "../user-modal/user-modal.component";
import {MatListModule} from "@angular/material/list";
import {UtilService} from "../../services/util.service";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
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
    MatListModule
  ],
  templateUrl: './post.html',
  styleUrls: ['./post.scss']
})
export class Post implements OnInit {
  postId: any;
  $post: Observable<any> = new Observable();
  user = GetUser();

  form: FormGroup = new FormGroup({
    content: new FormControl('', Validators.required),
    post_id: new FormControl('', Validators.required),
    status: new FormControl(1, Validators.required),
  });

  constructor(
    private service: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private modal: MatDialog,
    public util: UtilService,
    private messageService: MessageService
  ) {

  }

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id');
    this.getPost();
    this.form.patchValue({
      post_id: this.postId
    });

  }

  getPost() {
    this.$post = this.service.getPostById(this.postId);
  }


  navigate(url: string, replaceUrl: boolean): void {
    this.router.navigate([`/${url}`], {replaceUrl: replaceUrl}).finally();
  }

  //user_modal component
  // fullName, count(Comments), date(registers), img
  showUser(id: number) {

    const m = this.modal.open(
      UserModalComponent,
      {width: '900px'}
    );
    m.componentInstance.dialog = m;
    m.componentInstance.userId = id;

    m.afterClosed().subscribe(d => {
      console.log(d);
    });
  }

  addMessage() {
    let formValue = this.form.getRawValue();

    this.messageService.saveMessage(formValue).subscribe((res: any) => {
      if (res.success) {
        this.util.successMsg('Успешно сохранено', 4000);
        this.form.controls['content'].patchValue('')
        this.getPost();
      } else this.util.errorMsg(res.msg);

    });

  }
}
