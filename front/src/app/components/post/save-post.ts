import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTabsModule} from "@angular/material/tabs";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";


import {MatButtonModule} from "@angular/material/button";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {PostService} from "../../services/post.service";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {CategoryService} from "../../services/category.service";
import {Observable} from "rxjs";
import {HttpService} from "../../services/http.service";


@Component({
  templateUrl: 'save-post.html',
  standalone: true,
  providers: [MatDatepickerModule, MatNativeDateModule],
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
    NgForOf,
    MatDialogModule,
    MatDialogModule,
    MatSelectModule,
    NgIf
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SavePost implements OnInit {
  dialog: any;

  categories$: Observable<any> = this.categoryService.getCategories();


  postForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    status: new FormControl(1, Validators.required),
  });


  constructor(
    private service: PostService,
    private categoryService: CategoryService,
    private http: HttpService
  ) {
  }

  ngOnInit(): void {
  }

  protected readonly focus = focus;

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  submit() {
    let formValue = this.postForm.getRawValue();
    this.service.savePost(formValue).subscribe((res: any) =>
    {
      if (res.success) {
        this.http.successMsg('Успешно сохранено', 4000);
        this.dialog.close(true);

      }
      else this.http.errorMsg(res.msg);
    });
  }
}
