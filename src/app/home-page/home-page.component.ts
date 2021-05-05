import { Component, OnInit, ViewChild } from '@angular/core';

import { IUser } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  @ViewChild('upArrow') upArrow: any;
  // upArrow = angular.element(document.querySelector("up-arrow"));

  userData: IUser;
  
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    const currentUser: IUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser) {
      this.auth
        .getUser(currentUser.uid)
        .subscribe((user) => (this.userData = user));
    }
    // Отображение стрелки для поднятия в начало сайта при скроле

    // console.dir(this.upArrow);
    // console.log('upArrow: ', this.upArrow);

    // window.addEventListener('scroll', (event) => {
    //   upArrow.style = 'display: block';
    //   if (window.pageYOffset === 0) {
    //     upArrow.style = 'display: none';
    //   }
    // });
  }
}
