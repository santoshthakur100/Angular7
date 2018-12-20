import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EthicalTradingComponent } from './ethicalTrading.component';
import { EthicalTradingRoutes } from './ethicalTrading.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(EthicalTradingRoutes)
  ],
  declarations: [EthicalTradingComponent]
})

export class EthicalTradingModule { }
