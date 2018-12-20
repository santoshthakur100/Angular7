import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpHeaders, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { APIConstants } from '../api/api.constants';
import { Router } from '@angular/router'
import { AuthenticationService } from '../services/authentication.service';
import 'rxjs/add/operator/do';

@Injectable()

export class SessionInterceptor implements HttpInterceptor {

  constructor(private router: Router,
    private injector: Injector
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = this.injector.get(AuthenticationService)

    let headers = new HttpHeaders({
      'oauth': APIConstants.OAUTH_TOKEN,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })

    // add authorization header with token if available
    let currentUser = JSON.parse(localStorage.getItem('user'))
    if (currentUser && currentUser.session_id) {
      headers = headers.append('Session', currentUser.session_id)
      request = request.clone({ headers })
    } else {
      request = request.clone({ headers })
    }

    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401 || err.status === 440) {
          // redirect to the login route
        //   auth.logout()
          this.router.navigate(['auth/login'])
        }
      }
    })
  }
}