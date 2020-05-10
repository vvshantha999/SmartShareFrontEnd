import {Injectable} from '@angular/core';
import {Auth0ServiceService} from './auth0/auth0-service.service';
import {CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  private isLoggedIn;

  constructor(public oauth: Auth0ServiceService, public router: Router) {
    this.oauth.isLoggedIn().then(value => {
      this.isLoggedIn = value;
    });
  }

  canActivate(): boolean {

    // @ts-ignore
    if (!this.isLoggedIn) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
