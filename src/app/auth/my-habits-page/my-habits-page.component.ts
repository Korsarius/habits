import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { HabitDialogComponent } from 'src/app/shared/components/habit-dialog/habit-dialog.component';

@Component({
  selector: 'app-my-habits-page',
  templateUrl: './my-habits-page.component.html',
  styleUrls: ['./my-habits-page.component.scss'],
})
export class MyHabitsPageComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog() {
    const dialogRef = this.dialog.open(HabitDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
