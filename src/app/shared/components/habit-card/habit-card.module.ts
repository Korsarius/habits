import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitCardComponent } from './habit-card.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [HabitCardComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [HabitCardComponent],
})
export class HabitCardModule {}
