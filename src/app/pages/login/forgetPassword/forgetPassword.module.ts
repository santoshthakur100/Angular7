import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgetPasswordComponent } from './forgetPassword.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ForgetPasswordComponent],
  exports:[ForgetPasswordComponent]
})
export class ForgetPasswordModule { }
