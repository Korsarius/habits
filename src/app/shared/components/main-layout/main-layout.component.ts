import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  isLoggenIn: boolean;

  ngOnInit(): void {
    this.isLoggenIn = !!localStorage.getItem('session-token');
  }

  logout() {
    // this.auth.logout();
    this.isLoggenIn = false;
    this.router.navigate(['/']);
  }
}
