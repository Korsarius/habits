import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './profile-page.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ProfilePageComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [ProfilePageComponent],
})
export class ProfilePageModule { }
