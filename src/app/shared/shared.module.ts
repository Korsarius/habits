import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLayoutModule } from './components/main-layout/main-layout.module';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule, MainLayoutModule, HttpClientModule],
  exports: [HttpClientModule],
  providers: [AuthService]
})
export class SharedModule {}
