import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { SwiperModule } from 'swiper/angular';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthModule } from './auth/auth.module';
import { HabitsPageModule } from './habits-page/habits-page.module';
import { HomePageModule } from './home-page/home-page.module';
import { LoginPageModule } from './login-page/login-page.module';
import { RegistrationPageModule } from './registration-page/registration-page.module';
import { SharedModule } from './shared/shared.module';

import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    SwiperModule,
  ],
  exports: [SwiperModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
