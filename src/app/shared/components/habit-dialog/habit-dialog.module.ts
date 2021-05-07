import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitDialogComponent } from './habit-dialog.component';

@NgModule({
  declarations: [HabitDialogComponent],
  imports: [
    CommonModule
  ],
  exports: [HabitDialogComponent],
})
export class HabitDialogModule { }
