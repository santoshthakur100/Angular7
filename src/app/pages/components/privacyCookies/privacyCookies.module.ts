import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyCookiesComponent } from './privacyCookies.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PrivacyCookiesComponent],
  exports:[PrivacyCookiesComponent]
})
export class PrivacyCookiesModule { }
