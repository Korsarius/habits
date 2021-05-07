import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitDialogComponent } from './habit-dialog.component';
import { HabitFormModule } from '../habit-form/habit-form.module';

@NgModule({
  declarations: [HabitDialogComponent],
  imports: [
    CommonModule,
    HabitFormModule
  ],
  exports: [HabitDialogComponent],
})
export class HabitDialogModule { }
