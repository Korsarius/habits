import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLayoutModule } from './components/main-layout/main-layout.module';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { UserFormComponent } from './components/user-form/user-form.component';

@NgModule({
  declarations: [UserFormComponent],
  imports: [CommonModule, MainLayoutModule, HttpClientModule],
  entryComponents: [UserFormComponent],
  exports: [HttpClientModule, UserFormComponent],
  providers: [AuthService]
})
export class SharedModule {}
