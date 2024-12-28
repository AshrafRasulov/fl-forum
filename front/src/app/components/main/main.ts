import {Component, OnInit} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {Router} from "@angular/router";
import {User} from '../../model/user';
import {GetUser} from '../../services/user.service';
import {NgIf} from "@angular/common";
import {MatRippleModule} from "@angular/material/core";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatToolbarModule} from "@angular/material/toolbar";

@Component({
  selector: 'app-main',
  templateUrl: './main.html',
  styleUrls: ['./main.scss'],
  imports: [
    MatIconModule,
    MatButtonModule,
    NgIf,
    MatRippleModule,
    MatTooltipModule,
    MatToolbarModule
  ],
  standalone: true
})

export class Main implements OnInit {
  user: User = GetUser();

  constructor(
    private _route: Router
  ) {}

  ngOnInit(): void {}

  navigate(url: string = '', replaceUrl: boolean = true): void {
    this._route.navigate([`/${url}`], {replaceUrl: replaceUrl}).finally();
  }
}
