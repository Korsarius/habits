import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit{
 
  form: FormGroup;
  submitted = false;

  constructor() { }

  ngOnInit(): void {
    this.buildForm();
  }

 
  buildForm(): void{
    this.form =  new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
    console.log(this.form);
  }

  submit(): void{
    console.log('submit');
    if (this.form.invalid) {
      return
    }
    this.submitted = true;
  }
}
