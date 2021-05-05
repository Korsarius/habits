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

  ngOnInit(): void {
    this.isLoggenIn = !!localStorage.getItem('user');
    this.userData = JSON.parse(localStorage.getItem('user'));
  }

  logout() {
    // this.auth.SignOut();
    localStorage.clear();
    this.userData = null;
    this.isLoggenIn = false;
    this.router.navigate(['/']);
  }
}
