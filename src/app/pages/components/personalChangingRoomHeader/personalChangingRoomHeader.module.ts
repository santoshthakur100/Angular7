import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobxAngularModule } from 'mobx-angular';
import { RouterModule } from '@angular/router';
import { Ng2Webstorage } from 'ngx-webstorage';
import { PersonalChangingRoomComponent } from './personalChangingRoomHeader.component';

@NgModule({
  imports: [
    CommonModule,
    MobxAngularModule,
    RouterModule,
    Ng2Webstorage
  ],
  declarations: [PersonalChangingRoomComponent],
  exports: [PersonalChangingRoomComponent]
})

export class PersonalChangingRoomModule { }
