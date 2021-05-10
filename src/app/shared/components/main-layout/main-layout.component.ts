import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IUser } from '../../interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  userData: IUser | null;
  isLoggenIn: boolean;
  userId: string | null;
  userName: string;

  ngOnInit(): void {
    this.isLoggenIn = !!localStorage.getItem('user');
    this.userData = JSON.parse(localStorage.getItem('user'));
    this.userData ? (this.userId = this.userData.uid) : (this.userId = null);
    this.auth.getUser(this.userData.uid).subscribe(res => this.userName = res.firstName);
  }

  logout() {
    // this.auth.SignOut();
    localStorage.clear();
    this.userData = null;
    this.isLoggenIn = false;
    this.router.navigate(['/']);
  }

  onClick(): void {
    const x: Element = document.querySelector('#main-header');
    if (x) {
      x.scrollIntoView();
    }
  }
}
