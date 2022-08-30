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
@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  isRefreshing = false
  handleErrorCalled = false
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(false)

  constructor(
    private _injector: Injector,
    private _loginService: LoginService,
    private toastr: ToastrService,
    private _authService: AuthService,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    console.log(req);
    const tokenizedReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + `${this._authService.getToken()}`,
        token_type: `bearer`,
      },
    })
    return next.handle(tokenizedReq).pipe(
      mergeMap((res) => {
        //console.log(req,'reshANDLE');
          /* if(req.url.includes('RemoteStartTransaction')) {
          alert('inva');
          console.log(res);
          return of(res)
        }   */
        if ((res as any)?.body?.statusCode == 404) {
          return throwError(() => {
            new Error('error')
          })
        }
        return of(res)
      }),
      retry(1),
      catchError((error: HttpErrorResponse) => {
        if(error !== undefined && error.url !== null  && error.url.includes('RemoteStartTransaction') && error.error !== undefined) {
          this.toastr.error(JSON.stringify(error.error.error));
          
        }
        return of(null as any)
      }),
    )
  }

  /* intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>  {
    if(!request.url.includes('refreshToken')) {
    let token = null;
    let jwtToken: any;
   const tokenExpireTime = JSON.parse(JSON.stringify(localStorage.getItem('token_expires_on'))) || '';
   const refreshTokenExpireTime = JSON.parse(JSON.stringify(localStorage.getItem('refreshToken_expires_on')));
   let email =  localStorage.getItem('userEmail') || '';
   
   // CODE TO CHECK IS TOKEN EXPIRES
    email = localStorage.getItem('userEmail') || '';
    token = localStorage.getItem('token_id') || '';
   
   if(email !== '' && tokenExpireTime !== '' && !request.url.includes('refreshToken')) {
   // alert('not login page');
   if(token !== '') {
  request = this.addTokenHeader(request,token);
   }
   } else if(request.url.includes('refreshToken')) {
    return next.handle(request);
   } else  {
   // alert('go to login');
    return next.handle(request);
   }
    //   return next.handle(request).pipe(catchError(error => {
    //   if(error instanceof HttpErrorResponse && error.status == 401 && !this.handleErrorCalled) {
    //     return this.handle401Error(request,next);
        
    //   }
    //   else {
    //     return throwError(error)
    //   }
    // }));  

    return next.handle(request).pipe(
      mergeMap((res) => {
        if ((res as any)?.body?.statusCode >= 400) {
          return throwError(() => {
            new Error('error')
          })
        }
        return of(res)
      }),
      retry(1),
      catchError(error => {
        if(error instanceof HttpErrorResponse && error.status == 401 && !this.handleErrorCalled) {
          return this.handle401Error(request,next);
          
        }
        else {
          return throwError(error)
        }
      }),
    ) 
    
    
 //  return
  }
  return next.handle(request);
  } 

 
  addTokenHeader(request: HttpRequest<any>, token: any) {
  return request.clone({
    setHeaders: {'Authorization':`bearer ${token}`}
  })
  }
  
   handle401Error(request: HttpRequest<any>, next: HttpHandler) {
   // let authService = this._loginService
   alert('refresh token');
   
   this. handleErrorCalled = true;
    if(!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this._loginService.refreshToken().pipe(
        switchMap((res: any)=> {
          this.isRefreshing = false;
          res = res.data;
          localStorage.setItem('token_operator',res.access_token);
            localStorage.setItem('token_refresh',res.refresh_token);
            localStorage.setItem('token_id',res.id_token); // for role
            localStorage.setItem('token_expires_on',res.expires_on);
            localStorage.setItem('refreshToken_expires_on',res.not_before);
          this.refreshTokenSubject.next(res.access_token);
          return next.handle(this.addTokenHeader(request,res.access_token));

        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addTokenHeader(request,jwt))
        })
      );
    }

   } 
   
  */
}
