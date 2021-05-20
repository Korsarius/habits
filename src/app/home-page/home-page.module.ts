import { SwiperModule } from 'swiper/angular';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon'; 

import { HomePageComponent } from './home-page.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [HomePageComponent],
  imports: [CommonModule, RouterModule, MatIconModule, SharedModule, SwiperModule],
  exports: [RouterModule],
})
export class HomePageModule {}
