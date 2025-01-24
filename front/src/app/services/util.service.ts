import {inject, Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpService} from "./http.service";
import {BehaviorSubject, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  private _authed: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private http: HttpService
  ) { }

  setAuthed(authed: boolean){
    this._authed.next(authed);
  }

  getAuthed() {
    return this._authed;
  }

  errorMsg(msg: string, duration: number = 30000): void {
    this._snackBar.open(msg, undefined,
      {
        duration: duration,
        verticalPosition: 'top',
        panelClass: 'panel-error'
      });
  }

  successMsg(msg: string, duration: number = 5000): void {
    this._snackBar.open(msg, undefined,
      {
        duration: duration,
        verticalPosition: 'top'
      });
  }

  getUserById(id: number){
    return this.http.post({user_id: id},'user/get_user_by_id');
  }


}
