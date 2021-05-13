import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ProfilePageModule } from './profile-page/profile-page.module';
import { MyHabitsPageModule } from './my-habits-page/my-habits-page.module';


@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, ProfilePageModule, SharedModule, MyHabitsPageModule],
  exports: [RouterModule],
  providers: [],
})
export class AuthModule {}
