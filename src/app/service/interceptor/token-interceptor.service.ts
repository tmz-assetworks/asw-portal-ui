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
  handleErrorCalled: any = false
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(false)
  isUnAuth = false

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
    // alert('remove 401 call');
    let tokenExpireTime =
      JSON.parse(JSON.stringify(localStorage.getItem('token_expires_on'))) || ''
    const refreshTokenExpireTime = JSON.parse(
      JSON.stringify(localStorage.getItem('refreshToken_expires_on')),
    )
    const d = new Date()
    //let time = d.getTime()
    let time = new Date().getTime() / 1000

    // CALL REFRESH TOKEN 4 min before token expires
    /*  if((parseInt(tokenExpireTime) - 240000) <= time) {
      console.log('401 called');
  //  this.handle401Error(req,next);
    
   }   */
    if (!req.url.includes('refreshToken')) {
      const tokenizedReq = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + `${this._authService.getToken()}`,
          token_type: `bearer`,
        },
      })
      return next.handle(tokenizedReq)
    }
    return next.handle(req)
  }

  handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    // let authService = this._loginService
    console.log('401 called')

    this.handleErrorCalled = true
    localStorage.setItem(
      'handleErrorCalled',
      JSON.stringify(this.handleErrorCalled),
    )

    this._loginService.refreshToken().subscribe({
      next: (res: any) => {
        res = res.data[0]
        const decodeDataTime = this._loginService.getDecodedAccessToken(
          res.access_token,
        )
        localStorage.setItem('token_expires_on', decodeDataTime.exp)
        localStorage.setItem('token_operator', res.access_token)
        localStorage.setItem('token_refresh', res.refresh_token)
        localStorage.setItem('token_id', res.id_token) // for role
        localStorage.setItem('refreshToken_expires_on', res.not_before)
        // this.refreshTokenSubject.next(res.access_token);
        console.log('idTokenInter' + ' ', res.id_token)
        const tokenizedReq = request.clone({
          setHeaders: {
            Authorization: 'Bearer ' + `${res.id_token}`,
            token_type: `bearer`,
          },
        })
        return next.handle(tokenizedReq)
        // return next.handle(this.addTokenHeader(request,res.id_token));
      },
      error: (err) => {
        this.toastr.error('Something Went Wrong', 'Please Try Again')
      },
    })
  }

  // .pipe(
  //   mergeMap((res) => {
  //     if ((res as any)?.body?.statusCode == 404) {
  //       return throwError(() => {
  //         new Error('error')
  //       })
  //     }
  //     return of(res)
  //   }),
  //   // retry(1),
  //   catchError((error: HttpErrorResponse) => {
  //     if (
  //       error !== undefined &&
  //       error.url !== null &&
  //       error.url.includes('RemoteStartTransaction') &&
  //       error.error !== undefined
  //     ) {
  //       this.toastr.error(JSON.stringify(error.error.error))
  //     }
  //     return of(null as any)
  //   }),
  // )

  /* intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>  {
    
    let token = null;
    let jwtToken: any;
   let tokenExpireTime = JSON.parse(JSON.stringify(localStorage.getItem('token_expires_on'))) || '';
   const refreshTokenExpireTime = JSON.parse(JSON.stringify(localStorage.getItem('refreshToken_expires_on')));
   const d = new Date()
   let time = d.getTime()
   let email =  localStorage.getItem('userEmail') || '';
   
   // CODE TO CHECK IS TOKEN EXPIRES
    email = localStorage.getItem('userEmail') || '';
    token = localStorage.getItem('token_id') || '';
   // let beforeTokenExp = tokenExpireTime - 120000;
   //let beforeTokenExp = time + 120000; // 2 min
   
    // 29 AUG 2022
    //  if(tokenExpireTime < time) {
    //   alert('token expires');
    //    this.handle401Error(request,next);
      
    // }   
  //  alert(localStorage.getItem('handleErrorCalled'));
    // if(beforeTokenExp < tokenExpireTime ) {
    //  alert('60 min before token expires');
    //  this.handle401Error(request,next); // 18+36
    //  }   
     // 4 min before token expires
    // tokenExpireTime = tokenExpireTime - 240000
  // 60 min before token expiration
  //  tokenExpireTime = tokenExpireTime - 5400000
 
    this.handleErrorCalled = localStorage.getItem('handleErrorCalled') !== undefined && localStorage.getItem('handleErrorCalled') !== null ?
   JSON.parse(JSON.stringify(localStorage.getItem('handleErrorCalled'))) : false
   // console.log('handle err',this.handleErrorCalled);
   // tokenExpireTime = tokenExpireTime - 120000
    // if(beforeTokenExp < time + 240000) { 
    //   alert('2 min before token expires');
    //   this.handle401Error(request,next);
    
    //   } else {
    //     alert('not epired');
    //   } 
   if(!request.url.includes('refreshToken')) {
    
   if(email !== '' && tokenExpireTime !== '' && !request.url.includes('refreshToken')) {
   // alert('not login page');
   if(token !== '') {
  request = this.addTokenHeader(request,token);
   }
   } else if(request.url.includes('refreshToken') || this.handleErrorCalled == 'true') {
    return next.handle(request);
   } else if(this.handleErrorCalled == false)  {
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
        // && this.handleErrorCalled == false  tokenExpireTime < time
         if(error instanceof HttpErrorResponse && error.status == 401 && parseInt(tokenExpireTime) < time) {
          return this.handle401Error(request,next);
          
        } else if(error !== undefined && error.url !== null  && error.url.includes('RemoteStartTransaction') && error.error !== undefined) {
          this.toastr.error(JSON.stringify(error.error.error));
          return of(null as any)
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
    //    if(request.url.includes('getsummarystatus')) {
    //    alert('remove niharika comment');
    //    token = token + 'sdsds'
    //  }    
     console.log('token added',token);
  return request.clone({
    setHeaders: {'Authorization':`bearer ${token}`}
  })
  }
  
   handle401Error(request: HttpRequest<any>, next: HttpHandler) {
   // let authService = this._loginService
   alert('401 called');
   
   this.handleErrorCalled = true;
   localStorage.setItem('handleErrorCalled',JSON.stringify(this.handleErrorCalled))
    if(!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this._loginService.refreshToken().pipe(
        switchMap((res: any)=> {
          
          console.log(res, 'from refresh token');
          this.isRefreshing = false;
          res = res.data[0];
          const decodeDataTime = this._loginService.getDecodedAccessToken(
            res.access_token,
          )
          localStorage.setItem('token_expires_on', decodeDataTime.exp)
          localStorage.setItem('token_operator',res.access_token);
            localStorage.setItem('token_refresh',res.refresh_token);
            localStorage.setItem('token_id',res.id_token); // for role
            localStorage.setItem('refreshToken_expires_on',res.not_before);
            this.refreshTokenSubject.next(res.access_token);
            console.log('idTokenInter' + ' ',res.id_token);
          return next.handle(this.addTokenHeader(request,res.id_token));

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

   } */
}
