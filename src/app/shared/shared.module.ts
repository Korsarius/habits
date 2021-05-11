import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLayoutModule } from './components/main-layout/main-layout.module';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { UserFormModule } from './components/user-form/user-form.module';
import { HabitDialogModule } from './components/habit-dialog/habit-dialog.module';
import { HabitFormModule } from './components/habit-form/habit-form.module';
import { HabitCardModule } from './components/habit-card/habit-card.module';
import { MatButtonModule } from '@angular/material/button'; 
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [
    CommonModule,
    MainLayoutModule,
    HabitDialogModule,
    HabitFormModule,
    UserFormModule,
    HttpClientModule,
    HabitCardModule,
    MatButtonModule
    
  ],
  exports: [
    HttpClientModule,
    UserFormModule,
    HabitDialogModule,
    HabitFormModule,
    HabitCardModule,
    ConfirmationDialogComponent
  ],
  providers: [AuthService],
})
export class SharedModule {}
