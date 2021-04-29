import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  
  form: FormGroup;
  genders: string[] = ['female', 'male', 'other'];
  submitted = false;
  


  constructor() { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void{
    this.form =  new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      birthDate: new FormControl(null),
      gender: new FormControl(null),
      location: new FormControl(null),
      
    })
    // console.log(this.form);
  }

  submit(): void{
    console.log('submit', this.form);
    if (this.form.invalid) {
      return
    }
    this.submitted = true;
  }

}
