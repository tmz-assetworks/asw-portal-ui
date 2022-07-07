import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from '../service/auth/auth.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {}
  canActivate() {
   // return true;
    
    if (this._authService.isLoggedIn() !== '' ) {
      // this._router.navigate(['/superadmin/customer'])
      return true
    
   } else {
      this._router.navigate(['/login'])
      return false
    }
} 
}
