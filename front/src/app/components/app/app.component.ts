import {Component, ElementRef, HostListener, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {AsyncPipe, DOCUMENT, NgIf} from '@angular/common';
import {HeaderComponent} from "../component/header/header.component";
import {GetUser} from "../../services/user.service";
import {UtilService} from "../../services/util.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    RouterOutlet,
    MatDialogModule,
    HeaderComponent,
    NgIf,
    AsyncPipe
  ],
  providers: [MatSnackBar],
  standalone: true
})
export class AppComponent implements OnInit {
  private _doc: Document = inject(DOCUMENT);
  private _eRef: ElementRef = inject(ElementRef);
  private _dialog: MatDialog = inject(MatDialog);
  private _bar: MatSnackBar = inject(MatSnackBar);
  public user = GetUser();
  windowClick(evt: any): void {
    if (this._eRef.nativeElement.contains(evt.target)) this._bar.dismiss();
  }

  constructor(
    public util: UtilService
  ) {
    this.util.getAuthed().subscribe(a=> console.log(a));
  }

  ngOnInit(){
    console.log(this.user);
    this.setAuthedFromSession();
  }

  setAuthedFromSession(){
    let authed = !!localStorage.getItem('token')
    this.util.setAuthed(authed);
  }

  @HostListener('document:click', ['$event'])
  documentClick(event: any): void {
    if (this._dialog.openDialogs.length > 0 && this._doc.body.contains(event.target)) this._bar.dismiss();
  }
}
