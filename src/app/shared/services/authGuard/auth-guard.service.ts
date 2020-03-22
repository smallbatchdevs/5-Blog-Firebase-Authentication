import {Injectable}  from '@angular/core';
import {AuthService}         from '../authentication/auth.service';
import {CanActivate, Router} from '@angular/router';

@Injectable({
              providedIn: 'root'
            })
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (!this.auth.isSmallBatchDevsLoggedIn()) {
      this.router.navigate([`/`]);
      return false;
    }
    return true;
  }
}
