import {Component, OnChanges, OnInit} from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {User} from "../../../model/user";
import {GetUser} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatRippleModule} from "@angular/material/core";
import {UtilService} from "../../../services/util.service";
import {UserModalComponent} from "../../user-modal/user-modal.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    NgIf,
    MatRippleModule,
    MatTooltipModule,
    MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnChanges {
  public user = GetUser();

  constructor(
    private _route: Router,
    private router: ActivatedRoute,
    public util: UtilService,
    private modal: MatDialog
  ) {
    this._route.events.subscribe(a => this.user = GetUser());
  }

  ngOnChanges(): void {
    console.log(this.user.user_id);
  }

  navigate(url: string = '', replaceUrl: boolean = true): void {
    this._route.navigate([`/${url}`], {replaceUrl: replaceUrl}).finally();
  }

  logout() {
    localStorage.clear();
    this.util.setAuthed(false);
    this._route.navigate(["auth"]);
  }

  showUser(id: number) {
    const m = this.modal.open(
      UserModalComponent,
      {width: '900px'}
    );
    m.componentInstance.dialog = m;
    m.componentInstance.userId = id;
  }
}
