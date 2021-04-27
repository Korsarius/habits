import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home-page.component';
import { LoginPageComponent } from './../login-page/login-page.component';
import { RegistrationPageComponent } from './../registration-page/registration-page.component';
import { HabitsPageComponent } from '../habits-page/habits-page.component';
import { ProfilePageComponent } from '../auth/profile-page/profile-page.component';
import { MainLayoutComponent } from '../shared/components/main-layout/main-layout.component';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainLayoutComponent,
        children: [
          {
            path: '',
            component: HomePageComponent,
          },
          {
            path: 'login',
            component: LoginPageComponent,
          },
          {
            path: 'registration',
            component: RegistrationPageComponent,
          },
          {
            path: 'habits',
            component: HabitsPageComponent,
          },
          {
            path: 'profile',
            component: ProfilePageComponent,
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class HomePageModule {}
