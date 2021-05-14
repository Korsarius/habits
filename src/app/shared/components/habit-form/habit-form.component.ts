import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';

import { IHabit, IUser } from '../../interfaces';
import { AuthService } from '../../services/auth.service';
import { HabitDialogComponent } from '../habit-dialog/habit-dialog.component';

@Component({
  selector: 'app-habit-form',
  templateUrl: './habit-form.component.html',
  styleUrls: ['./habit-form.component.scss'],
})
export class HabitFormComponent implements OnInit {
  @Input() habit: IHabit;

  form: FormGroup;
  types: Array<String> = ['Health', 'Sport', 'Life', 'Work', 'Food', 'Other'];

  constructor(
    private auth: AuthService,
    private dialogRef: MatDialogRef<HabitDialogComponent>
  ) {
    this.dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.buildForm();
    console.log(this.habit);
  }

  buildForm(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      type: new FormControl(null),
      frequency: new FormControl(null),
      description: new FormControl(null),
    });
  }

  onSave(): void {
    const habit: IHabit = {
      ...this.form.value,
      public: true,
      author: '',
    };
    const user: IUser = JSON.parse(localStorage.getItem('user'));
    this.auth.addNewMyHabit(user, habit);
    this.dialogRef.close();
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
