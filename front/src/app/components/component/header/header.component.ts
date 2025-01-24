import {Component, OnInit} from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {User} from "../../../model/user";
import {GetUser} from "../../../services/user.service";
import {Router} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatRippleModule} from "@angular/material/core";
import {UtilService} from "../../../services/util.service";

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
export class HeaderComponent implements OnInit  {
  public user = GetUser();
  constructor(
    private _route: Router,
    public util: UtilService
  ) {}

  ngOnInit(): void {}

  navigate(url: string = '', replaceUrl: boolean = true): void {
    this._route.navigate([`/${url}`], {replaceUrl: replaceUrl}).finally();
  }

  logout() {
    localStorage.clear();
    this.util.setAuthed(false);
    this._route.navigate(["auth"]);
  }
}
