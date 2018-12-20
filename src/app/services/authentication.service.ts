import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
// import { AlertService } from '@services/alert.service'
import { APIConstants } from '../api/api.constants'
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(
        private http: HttpClient,
        private route: Router,
        // private alertService: AlertService
    ) { }

    login(params: any) {
        return this.http.post<Response>(APIConstants.LOGIN, params)
            .map((response: any) => {
                if (response.status == 'success') {
                    localStorage.setItem('currentUser', JSON.stringify(response.data[0]))
                }
                return response
            })
    }

    // logout() {
    //     this.http.get<Response>(APIConstants.LOGOUT).subscribe((response: any) => {
    //         if (response.status == 'success') {
    //             localStorage.removeItem('currentUser')
    //             this.alertService.success(response.data[0])
    //             this.route.navigate(['/login'])
    //         } else {
    //             this.alertService.error(response.error.messages)
    //         }
    //     })
    // }

    currentUser(session: string) {
        return this.http.get<Response>(APIConstants.LOGIN + '/' + session)
            .map((response: any) => {
                if (response.status === 'success') {
                    localStorage.setItem('currentUser', JSON.stringify(response.data[0]))
                }
                return response
            })
    }

    // forgetPassword(params: any) {
    //     return this.http.post<Response>(APIConstants.FORGET_PASSWORD, params)
    //         .map((response) => {
    //             return response
    //         })
    // }
}