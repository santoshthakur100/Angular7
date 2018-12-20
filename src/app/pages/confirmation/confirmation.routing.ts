import { Routes, RouterModule } from '@angular/router';
import {ConfirmationComponent} from './confirmation.component';

export const ConfirmationRoutes: Routes = [
  {
  	path: '',
  	component: ConfirmationComponent
  }
];

// export const ConfirmationRoutes = RouterModule.forChild(routes);


// import { Routes } from '@angular/router';
// import { ContactComponent } from './contact.component';

// export const ContactRoutes: Routes = [
//   {
//   	path: '',
//   	component: ContactComponent
//   }
// ];
