import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsConditionsComponent } from './termsConditions.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TermsConditionsComponent],
  exports:[TermsConditionsComponent]
})
export class TermsConditionsModule { }
