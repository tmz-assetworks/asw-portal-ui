import { Injectable } from '@angular/core'
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  NavigationEnd,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from '../service/auth/auth.service'

@Injectable({
  providedIn: 'root',
})
export class RoleAuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    public activatedRoute: ActivatedRoute,
    private _authService: AuthService,
  ) {}
  canActivate() {
    // this._router.(['/superadmin/customer'])
    let routePath = ''
    routePath = window.location.pathname.split('/')[1]
    // console.log((this.activatedRoute as any)['_routerState'].snapshot.url)
    let getRole = localStorage.getItem('role') || ''

    if (
      getRole !== '' &&
      routePath.indexOf(getRole.toLowerCase()) !== -1 &&
      this._authService.haveAccess(getRole)
    ) {
      return true
    } else if (routePath == 'login') {
      return true
    } else {
      //alert('no login');
      this._router.navigate(['/login'])
      return false
    }
  }
}
