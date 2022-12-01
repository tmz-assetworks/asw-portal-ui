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
  finalize,
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
import { LoaderService } from '../loader.service'
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
    private _loaderService: LoaderService,
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    this._loaderService.show()

    // next.handle(request).pipe(finalize(() => this._loaderService.hide()))

    if (this._authService.getToken() && !request.url.includes('refreshToken')) {
      request = this.addToken(request, this._authService.getToken())
    } /* else if(request.url.includes('refreshToken')) {
      request = request
    } */

    return next.handle(request).pipe(
      finalize(() => this._loaderService.hide()),

      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next)
        } else if (
          error.status === 400 &&
          request.url.includes('refreshToken')
        ) {
          this.toastr.error('Token is expired. Please login again')
          localStorage.removeItem('userEmail')
          localStorage.removeItem('token_operator')
          localStorage.removeItem('role')
          localStorage.removeItem('token_refresh')
          localStorage.removeItem('token_id')
          localStorage.removeItem('token_expires_on')
          localStorage.removeItem('refreshToken_expires_on')
          localStorage.removeItem('handleErrorCalled')
          localStorage.removeItem('resetToken')
          localStorage.removeItem('userEmailVerify')
          localStorage.removeItem('timeInterval')
          localStorage.removeItem('user_id')
          localStorage.removeItem('username')
          localStorage.removeItem('emailEleVehi')
          localStorage.removeItem('passEleVehi')

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
