import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http'
import { Injectable, Injector } from '@angular/core'

import {
  BehaviorSubject,
  catchError,
  filter,
  map,
  mergeMap,
  Observable,
  of,
  retry,
  switchMap,
  take,
  throwError,
} from 'rxjs'
import { LoginService } from 'src/app/screen/login/login.service'
import { AuthService } from '../auth/auth.service'
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router'
@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  private isRefreshing = false
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null,
  )

  constructor(
    private _injector: Injector,
    private _loginService: LoginService,
    private toastr: ToastrService,
    private _authService: AuthService,
    private _router: Router,
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (this._authService.getToken() && !request.url.includes('refreshToken')) {
      request = this.addToken(request, this._authService.getToken())
    } /* else if(request.url.includes('refreshToken')) {
      request = request
    } */

    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next)
        } else if (
          error.status === 400 &&
          request.url.includes('refreshToken')
        ) {
          this.toastr.error('Token is expired. Please login again')
          this._router.navigate(['./login'])

          return throwError(error)
        } else {
          return throwError(error)
        }
      }),
    )
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    // alert(401);

    // return;
    if (!this.isRefreshing) {
      this.isRefreshing = true
      this.refreshTokenSubject.next(null)
      const token = localStorage.getItem('token_refresh')

      if (token)
        return this._loginService.refreshToken().pipe(
          switchMap((token: any) => {
            this.isRefreshing = false
            localStorage.setItem('token_operator', token.data[0].access_token)
            localStorage.setItem('token_refresh', token.data[0].refresh_token)
            localStorage.setItem('token_id', token.data[0].access_token)

            this.refreshTokenSubject.next(token.data[0].access_token)

            return next.handle(
              this.addToken(request, token.data[0].access_token),
            )
          }),
          catchError((err) => {
            this.isRefreshing = false

            // this.tokenService.signOut();
            return throwError(err)
          }),
        )
    }
    return this.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addToken(request, token))),
    )
  }
}
