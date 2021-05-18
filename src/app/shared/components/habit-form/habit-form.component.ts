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
      title: new FormControl(this.habit ? this.habit.title : null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      type: new FormControl(this.habit ? this.habit.type : null),
      frequency: new FormControl(this.habit ? this.habit.frequency : null),
      description: new FormControl(this.habit ? this.habit.description : null, [
        Validators.maxLength(10000),
      ]),
    });
  }


  onSave(): void {
    const user: IUser = JSON.parse(localStorage.getItem('user'));

    if (this.habit) {
      const editedHabit: IHabit = {

        ...this.form.value,
        public: true,
        hid: this.habit.hid,
      };

      this.auth.updateMyHabit(editedHabit, user);
    } else {
      const habit: IHabit = {
        ...this.form.value,
        public: true,
        author: '',
      };

      this.auth.addNewMyHabit(user, habit);
    }


    this.dialogRef.close();
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
