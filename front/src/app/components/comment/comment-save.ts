import {Component, OnInit} from '@angular/core';
import {AsyncPipe, CommonModule, NgForOf, NgIf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTabsModule} from "@angular/material/tabs";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatListModule} from "@angular/material/list";
import {MessageService} from "../../services/message.service";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {HttpService} from "../../services/http.service";

@Component({
  templateUrl: 'comment-save.html',

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
    MatListModule,
    MatDialogModule
  ],
})
export class EditMessage implements OnInit {

  messageForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    content: new FormControl(''),
  })
  dialog: MatDialogRef<EditMessage, any>;

  constructor(
    private service: MessageService,
    private http: HttpService
  ) {
  }

  ngOnInit(): void {
  }

  submit(){
    this.service.saveMessage(this.messageForm.getRawValue()).subscribe((res: any) =>
    {
      if (res.success) {
        this.http.successMsg('Успешно сохранено', 4000);
        this.dialog.close(true);

      }
      else this.http.errorMsg(res.msg);
    });
  }
}
