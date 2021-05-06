import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLayoutModule } from './components/main-layout/main-layout.module';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { UserFormModule } from './components/user-form/user-form.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, MainLayoutModule, UserFormModule, HttpClientModule],
  exports: [HttpClientModule, UserFormModule],
  providers: [AuthService]
})
export class SharedModule {}
