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

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buildForm();
    // this.auth.testPost();
    this.auth.getUsers().subscribe((res) => console.log('result:', res));
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

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;
    const user: IUser = {
      email: this.form.value.email,
      password: this.form.value.password,
      // secureToken: true,
    };
    this.auth.SignIn(user.email, user.password).then(async (res) => await res).then((data) => console.log("data:", data));

    // this.auth.SignIn(user.email, user.password).subscribe(
    //   (res) => {
    //     console.log('res: ', res);
    //     // this.auth
    //     //   .getUser(res.localId)
    //     //   .subscribe((u) => console.log('user:', u));
    //     this.form.reset();
    //     this.router.navigate(['/']);
    //     this.submitted = false;
    //   },
    //   () => {
    //     this.submitted = false;
    //   }
    // );
  }
}
