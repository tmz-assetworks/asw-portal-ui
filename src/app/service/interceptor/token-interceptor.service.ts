import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/screen/login/login.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor  {
 
  constructor(private _injector: Injector, private _loginService: LoginService) { 
   
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>  { 
    return next.handle(req);
  }
 /* intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>  {
    const d = new Date();
    let time = d.getTime(); 
    let token = null;
    let jwtToken: any;
   const tokenExpireTime = JSON.parse(JSON.stringify(localStorage.getItem('token_expires_on'))) || '';
   const refreshTokenExpireTime = JSON.parse(JSON.stringify(localStorage.getItem('refreshToken_expires_on')));
   let email =  localStorage.getItem('userEmail') || '';
   
   // CODE TO CHECK IS TOKEN EXPIRES
   email = 'operator@devopstekmindz.onmicrosoft.com';
   if(email !== '' && tokenExpireTime !== '' && !req.url.includes('AuthNew')) {
    let authService = this._injector.get(AuthService);
   if(tokenExpireTime < time && refreshTokenExpireTime > time) {
    // MAKE API CALL 
    alert('make api call');
    this._loginService.refreshToken().subscribe({
      next: (res: any) => {
        res = res.data[0];
        localStorage.setItem('token_operator',res.access_token);
          localStorage.setItem('token_refresh',res.refresh_token);
          localStorage.setItem('token_id',res.id_token); // for role
          localStorage.setItem('token_expires_on',res.expires_on);
          localStorage.setItem('refreshToken_expires_on',res.not_before);
       // this.showLoader = false;
      //  this._router.navigate(['/verifyOTP']);
      token = authService.getToken()
      },
      error: (err) => {
       // this.showLoader = false;
        alert('Invalid Email id');
     //  Swal.fire('Something Went Wrong','Please Try Again' ,'error')
      }
    });

   } else if(tokenExpireTime > time) {
   // let authService = this._injector.get(AuthService);
      token = authService.getToken()
   } 

  // let authService = this._injector.get(AuthService);
    jwtToken = req.clone(
      {
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      }
      
    )
    console.log('token added for', req.url,token);
    return next.handle(jwtToken);
   } else if(req.url.includes('AuthNew')){
    alert('go to login');
    return next.handle(req);
   }
   
    
    return next.handle(jwtToken); 
 //  return
  } */
}
