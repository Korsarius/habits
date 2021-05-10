import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private auth: AuthService, public router: Router, public activedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('user'));
    console.log('this.userData: ', this.userData);
    this.buildForm(this.userData);
    if (this.router.url === `/profile/${this.userData.uid}/edit`) {
      this.isEdit = true;
    }
  }

  buildForm(user: IUser): void {
    this.form = new FormGroup({
      email: new FormControl(user ? user.email : null, [
        Validators.required,
        Validators.email,
      ]),
      firstName: new FormControl(user ? user.firstName : null, [
        Validators.required,
      ]),
      lastName: new FormControl(user ? user.lastName : null, [
        Validators.required,
      ]),
      birthDate: new FormControl(user ? user.birthDate : null),
      gender: new FormControl(user ? user.gender : null),
      location: new FormControl(user ? user.location : null),
    });
  }

  onEdit(): void {
    this.isEdit = true;
    this.router.navigate(['/profile', this.userData.uid, 'edit']);
  }

  async onSave(): Promise<void> {
    const user: IUser = {
      ...this.form.value,
    };

    await this.auth.updateUser(user, this.userData.uid);

    this.auth.getUser(this.userData.uid).subscribe((u) => {
      this.userData = u;
      this.userData.uid = JSON.parse(localStorage.getItem('user')).uid;
      localStorage.setItem('user', JSON.stringify(this.userData));
      this.isEdit = false;
      this.router.navigate(['/profile', this.userData.uid]);
    });
  }

  onCancel(): void {
    this.isEdit = false;
    this.router.navigate(['/profile', this.userData.uid]);
  }
}
