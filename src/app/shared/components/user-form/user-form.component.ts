import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { IUser } from '../../interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  userData: IUser;
  form: FormGroup;
  genders: string[] = ['female', 'male', 'other'];
  submitted = false;
  hide: boolean = true;
  isEdit: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('user'));
    this.buildForm(this.userData);
  }

  buildForm(user: IUser): void {
    this.form = new FormGroup({
      email: new FormControl(user ? user.email : null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      firstName: new FormControl(user ? user.firstName : null, [Validators.required]),
      lastName: new FormControl(user ? user.lastName : null, [Validators.required]),
      birthDate: new FormControl(user ? user.birthDate : null),
      gender: new FormControl(user ? user.gender : null),
      location: new FormControl(user ? user.location : null),
    });
  }
}
