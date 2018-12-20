import { NgModule } from '@angular/core'
import { ChangingRoomComponent } from './changingRoom.component';
import { RouterModule } from '@angular/router';
import { route } from './changingRoom.routing';
import { CommonModule } from '@angular/common';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(route)
    ],
    declarations: [ChangingRoomComponent]
})

export class ChangingRoomModule { }