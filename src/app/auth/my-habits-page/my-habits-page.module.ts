import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';

import { MyHabitsPageComponent } from './my-habits-page.component';

@NgModule({
  declarations: [MyHabitsPageComponent],
  imports: [CommonModule, MatDialogModule],
  exports: [MyHabitsPageComponent],
})
export class MyHabitsPageModule {}
