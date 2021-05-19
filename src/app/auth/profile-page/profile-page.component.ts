import { Component, OnInit } from '@angular/core';

import { IUser } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  userData: IUser;

  constructor() {}

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('user'));
  }
}
