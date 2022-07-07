import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
 baseURL = environment.baseURL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private _http: HttpClient) {}

  getApi(api: string): Observable<any> {
    //alert('get api');
    return this._http.get(
      api,
      this.httpOptions
    );
  }

  verifyUser(email: string) {
    let api = this.baseURL + 'VerifyUser';
    let params = '?emailid=' + email;
    let url = api + params
   // alert(url);
   // return;
    return this._http.get(url);
  }

  changePassword(email: string,password: string) {
    let api = this.baseURL + 'ChangePassword';
    let params = '?emailid=' + email + '&password=' + password;
    let url = api + params;
  //  alert(url);
 // url =  window.encodeURI(url)
    return this._http.get(url);
  }

  showPassword(password: boolean) {
  return !password
  }

  encryptPassword(field: string) {
    
    var keySize = 256;
  var salt = CryptoJS.lib.WordArray.random(16);
  // well known algorithm to generate key
  var key = CryptoJS.PBKDF2("E534C8DF286CD5931069B522E695D4F1", salt, {
      keySize: keySize/32,
      iterations: 100
    });
  // random IV
  var iv = CryptoJS.lib.WordArray.random(128/8);      
  // specify everything explicitly
  var encrypted = CryptoJS.AES.encrypt(field, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC        
  });
  // combine everything together in base64 string
  var result = CryptoJS.enc.Base64.stringify(salt.concat(iv).concat(encrypted.ciphertext));
  return result;

 
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
  sendData(email: string, password: string): Observable<any> {
   // const url = this.baseURL + 'Auth';
   const url = this.baseURL + 'AuthNew';
    let headers = new HttpHeaders();
    {
     headers = headers.set('Content-Type','application/json')
    }
    const body = {
       username: email,
       password: password
    }
    return this._http.post(url,JSON.stringify(body),{headers});
   // return this._http.post(url,JSON.stringify(body));

  }

  logout(email: string) {
    let api= this.baseURL + 'Logout';
    //alert(url);
    let params = '?emailid=' + email;
    let url = api + params
    let headers = new HttpHeaders();
    {
     headers = headers.set('Content-Type','application/json')
    }
    const body = {
       emailid: email
      
    }
    return this._http.post(url,{headers});
  }

  refreshToken() {
    
    let api= this.baseURL + 'AuthRefresh';
    alert(api);
    alert('refresh token api');
   let refreshToken = JSON.parse(JSON.stringify(localStorage.getItem('token_refresh'))) || '';
    let params = '?refreshToken=' + refreshToken;
    let url = api + params
    let headers = new HttpHeaders();
    {
     headers = headers.set('Content-Type','application/json')
    }
    
    return this._http.get(url,{headers});
  }

  
}
