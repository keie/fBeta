import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const jwt = this.authService.getToken();
        const authRequest = req.clone({ setHeaders: { authorization: `Bearer ${jwt}` } });


        return next.handle(authRequest).pipe(
            catchError((err, caught) => {
                if (err.status === 401) {
                    this.router.navigate(['login'], {
                        queryParams: { redirectUtl: this.router.routerState.snapshot.url },
                    });
                }
                return observableThrowError(err);
            })
        );

    }
}
