import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {Router} from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
  ;
import {map, Observable, Subscription} from "rxjs";
import {HttpService} from "../../services/http.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'dl-example',
  templateUrl: './example.html',
  styleUrls: ['./example.scss'],
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
  standalone: true
})
export class Example implements OnInit, OnDestroy {
  tab_index: number = 0;
  row: any;
  example_id: number | null = null;
  subs: Subscription = new Subscription();
  saveForm: FormGroup = new FormGroup<any>({
    example_id: new FormControl(0),
    example_name: new FormControl('', Validators.required),
    example_date: new FormControl(new Date(), Validators.required)
  });
  editForm: FormGroup = new FormGroup<any>({
    example_id: new FormControl(1),
    example_name: new FormControl('', Validators.required),
    example_date: new FormControl(new Date(), Validators.required)
  });
  info$: Observable<any> = this.getInfo();

  constructor(
    private _router: Router,
    private _http: HttpService
  ) {}

  ngOnInit(): void {}

  getInfo(): Observable<any> {
    return this._http.post({exp_id: this.example_id}, 'example/info')
      .pipe(map(m => {
        if (m.success) {
          if (m.obj.length > 0 ) this.setRow(m.obj[0]);
          return m.obj;
        }
        else {
          this._http.errorMsg(m.msg);
          return [];
        }
      }));
  }

  navigate(url: string, replaceUrl: boolean): void {
    this._router.navigate([`/${url}`], {replaceUrl: replaceUrl}).finally();
  }

  edit(): void {
    this.subs.add(this._http.post(this.editForm.getRawValue(), 'example/save')
      .subscribe(res => {
        if (res.success) {
          this.info$ = this.getInfo();
          this._http.successMsg('Успешно сохранено', 4000);
        }
        else this._http.errorMsg(res.msg);
      }))
  }

  save(): void {
    this.subs.add(this._http.post(this.saveForm.getRawValue(), 'example/save')
      .subscribe(res => {
        if (res.success) {
          this.info$ = this.getInfo();
          this._http.successMsg('Успешно сохранено', 4000);
          this.saveForm.reset();
          this.tab_index = 1;
        }
        else this._http.errorMsg(res.msg);
      }));
  }

  setRow(item: any): void {
    this.row = item;
    const dateString: string = String(item.js_date);
    const date: Date = new Date(dateString);
    this.editForm.patchValue({...item, example_date: date});
  }

  delete(item: any): void {
    this.subs.add(this._http.post({example_id: item.example_id}, 'example/delete')
      .subscribe(res => {
        if (res.success) {
          this.info$ = this.getInfo();
          this._http.successMsg('Успешно сохранено', 4000);
        }
        else this._http.errorMsg(res.msg);
      }));
  }

  trackBy = (index: number, item: any): string => `${index}_${item.example_id}`;

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
