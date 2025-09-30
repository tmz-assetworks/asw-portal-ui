import { Injectable, inject } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../service/auth/auth.service';

/**
 * Angular 15+ uses functional guards instead of class-based guards
 */
export const roleAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  
  let routePath = '';
  routePath = window.location.pathname.split('/')[1];
  let getRole = localStorage.getItem('role') || '';

  if (
    getRole !== '' &&
    routePath.indexOf(getRole.toLowerCase()) !== -1 &&
    authService.haveAccess(getRole)
  ) {
    return true;
  } else if (routePath == 'login') {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

/**
 * Legacy class-based guard for backward compatibility
 * @deprecated Use the functional roleAuthGuard instead
 */
@Injectable({
  providedIn: 'root',
})
export class RoleAuthGuard {
  constructor(
    private _router: Router,
    public activatedRoute: ActivatedRoute,
    private _authService: AuthService,
  ) {}
  
  canActivate() {
    let routePath = '';
    routePath = window.location.pathname.split('/')[1];
    let getRole = localStorage.getItem('role') || '';

    if (
      getRole !== '' &&
      routePath.indexOf(getRole.toLowerCase()) !== -1 &&
      this._authService.haveAccess(getRole)
    ) {
      return true;
    } else if (routePath == 'login') {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}
