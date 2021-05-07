import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLayoutModule } from './components/main-layout/main-layout.module';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { UserFormModule } from './components/user-form/user-form.module';
import { HabitDialogModule } from './components/habit-dialog/habit-dialog.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, MainLayoutModule, HabitDialogModule, UserFormModule, HttpClientModule],
  exports: [HttpClientModule, UserFormModule, HabitDialogModule],
  providers: [AuthService]
})
export class SharedModule {}
