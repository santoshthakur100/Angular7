import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { RouterModule } from '@angular/router';
import { TermsConditionsModule } from './../termsConditions/termsConditions.module';
import { PrivacyCookiesModule } from './../privacyCookies/privacyCookies.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PrivacyCookiesModule,
    TermsConditionsModule
  ],
  declarations: [FooterComponent],
  exports: [FooterComponent]
})

export class FooterModule { }
