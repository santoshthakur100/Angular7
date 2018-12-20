import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2Webstorage } from 'ngx-webstorage';
import { AppComponent } from './app.component';

import { MobxAngularModule } from 'mobx-angular';
import { Cart } from './store/cart.store';
import { UserService } from './services/user.service';
import { SessionInterceptor } from './helper/sessionInterceptor';
import { AuthenticationService } from './services/authentication.service';
import { SharedDataService } from './services/shareData.service';
import { OwlModule } from 'ngx-owl-carousel';
import { FilterDataService } from './services/filterData.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';
import { AlertComponent } from './pages/components/alert/alert.component';
import { AlertService } from './services/alert.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
// import {MainHomeComponent} from '../../src/app/pages/mainHome/mainHome.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlertComponent
  ],
  entryComponents: [
    LoginComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    OwlModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    MobxAngularModule,
    HttpClientModule,
    Ng2Webstorage,
    JwSocialButtonsModule
    
  ],
  providers: [
    UserService,
    CookieService,
    AlertService,
    Cart,
    SharedDataService,
    FilterDataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SessionInterceptor,
      multi: true
    },
    AuthenticationService
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
