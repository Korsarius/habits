import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MainLayoutComponent } from './main-layout.component';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { HomePageComponent } from 'src/app/home-page/home-page.component';
import { LoginPageComponent } from 'src/app/login-page/login-page.component';
import { RegistrationPageComponent } from 'src/app/registration-page/registration-page.component';
import { HabitsPageComponent } from 'src/app/habits-page/habits-page.component';
import { ProfilePageComponent } from 'src/app/auth/profile-page/profile-page.component';
import { MyHabitsPageComponent } from 'src/app/auth/my-habits-page/my-habits-page.component';

@NgModule({
  declarations: [MainLayoutComponent],
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
            pathMatch: 'full'
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
            path: 'profile/:id',
            component: ProfilePageComponent,
          },
          {
            path: 'profile/:id/myhabits',
            component: MyHabitsPageComponent,
          },
          {
            path: 'profile/:id/edit',
            component: ProfilePageComponent,
          },
        ],
      },
    ]),
    MatMenuModule,
    MatButtonModule,
  ],
})
export class MainLayoutModule {}
