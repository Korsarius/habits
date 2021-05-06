import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyHabitsPageComponent } from './my-habits-page/my-habits-page.component';
import { SharedModule } from '../shared/shared.module';
import { ProfilePageModule } from './profile-page/profile-page.module';

@NgModule({
  declarations: [MyHabitsPageComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, ProfilePageModule, SharedModule],
  exports: [RouterModule],
  providers: [],
})
export class AuthModule {}
