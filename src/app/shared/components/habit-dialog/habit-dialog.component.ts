import { Component, Input, OnInit, Inject } from '@angular/core';
import { IHabit, IUser } from '../../interfaces';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-habit-dialog',
  templateUrl: './habit-dialog.component.html',
  styleUrls: ['./habit-dialog.component.scss'],
})
export class HabitDialogComponent implements OnInit {
  userHabit: IHabit;

  constructor(
    private dialogRef: MatDialogRef<HabitDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { habit: IHabit; user: IUser }
  ) {}

  ngOnInit(): void {
    this.userHabit = this.data.habit;
  }
}
