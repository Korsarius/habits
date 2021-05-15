import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HabitsPageComponent } from './habits-page.component';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [HabitsPageComponent],
  imports: [CommonModule, SharedModule, MatButtonModule],
})
export class HabitsPageModule {}
