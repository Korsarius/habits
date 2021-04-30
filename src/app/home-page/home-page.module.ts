import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon'; 

import { HomePageComponent } from './home-page.component';

@NgModule({
  declarations: [HomePageComponent],
  imports: [CommonModule, RouterModule, MatIconModule],
  exports: [RouterModule],
})
export class HomePageModule {}
