import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthModule } from './auth/auth.module';
import { HabitsPageModule } from './habits-page/habits-page.module';
import { HomePageModule } from './home-page/home-page.module';
import { LoginPageModule } from './login-page/login-page.module';
import { RegistrationPageModule } from './registration-page/registration-page.module';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { SharedModule } from './shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HabitsPageModule,
    HomePageModule,
    LoginPageModule,
    RegistrationPageModule,
    SharedModule,
    NoopAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
