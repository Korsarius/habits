import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  hide = true;

  user$: Observable<IUser>;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.auth.getUsers().subscribe();
  }

  buildForm(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  submit(): Promise<void> {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;
    const user: IUser = {
      email: this.form.value.email,
      password: this.form.value.password,
    };
    this.auth.SignIn(user.email, user.password);
  }

  signInWithGoogle(): void {
    this.auth.GoogleAuth();
  }
}
