import {Component, ElementRef, HostListener, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    RouterOutlet,
    MatDialogModule
  ],
  providers: [MatSnackBar],
  standalone: true
})
export class AppComponent {
  private _doc: Document = inject(DOCUMENT);
  private _eRef: ElementRef = inject(ElementRef);
  private _dialog: MatDialog = inject(MatDialog);
  private _bar: MatSnackBar = inject(MatSnackBar);

  windowClick(evt: any): void {
    if (this._eRef.nativeElement.contains(evt.target)) this._bar.dismiss();
  }

  @HostListener('document:click', ['$event'])
  documentClick(event: any): void {
    if (this._dialog.openDialogs.length > 0 && this._doc.body.contains(event.target)) this._bar.dismiss();
  }
}
