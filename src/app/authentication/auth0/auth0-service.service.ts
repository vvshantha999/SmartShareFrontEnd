import {Injectable} from '@angular/core';
import {User, UserManager} from 'oidc-client';
import {Constants} from './constant';
import {Subject} from 'rxjs';
import {User as UserModel} from '../../smart-share/domain-models/User';

@Injectable({
  providedIn: 'root'
})
export class Auth0ServiceService {

  user: User = null;
  userModel: UserModel = null;
  isAuthenticated;
  private userManager: UserManager;
  private accessToken;
  private loginChangedSubject = new Subject<boolean>();
  loginChanged = this.loginChangedSubject.asObservable();
  private userAssignedSubject = new Subject<User>();
  userAssigned = this.userAssignedSubject.asObservable();

  constructor() {
    const auth0Settings = {
      authority: Constants.domain,
      client_id: Constants.clientId,
      redirect_uri: `${Constants.clientRoot}signin-callback`,
      scope: 'openid profile email smartshare-user',
      response_type: 'code',
      automaticSilentRenew: true,
      silent_redirect_uri: `${Constants.clientRoot}assets/silent-callback.html`,
      metadata: {
        issuer: 'https://smartshare.eu.auth0.com/',
        authorization_endpoint: 'https://smartshare.eu.auth0.com/authorize?audience=smartshare-api',
        jwks_uri: 'https://smartshare.eu.auth0.com/.well-known/jwks.json',
        token_endpoint: 'https://smartshare.eu.auth0.com/oauth/token',
        userinfo_endpoint: 'https://smartshare.eu.auth0.com/userinfo',
        // tslint:disable-next-line:max-line-length
        end_session_endpoint: `${Constants.domain}v2/logout?client_id=${Constants.clientId}&returnTo=${encodeURI(Constants.clientRoot)}signout-callback`
      }
    };
    this.userManager = new UserManager(auth0Settings);
    this.userManager.events.addAccessTokenExpired(ev => {
      this.loginChangedSubject.next(false);
    });
    this.userAssigned.subscribe(value => {
      this.accessToken = value.access_token;
      this.userModel = new UserModel(value.profile.picture, value.profile.name.split(' ')[0], value.profile.email);
    });

  }

  login() {
    return this.userManager.signinRedirect();
  }

  isLoggedIn(): Promise<boolean> {
    return this.userManager.getUser().then(user => {
      const currentUser = !!user && !user.expired;
      if (this.user !== user) {
        console.log('fired user loaded event');
        this.loginChangedSubject.next(currentUser);
        this.userAssignedSubject.next(user);
      }
      this.user = user;
      return currentUser;
    });
  }

  completeLogIn() {
    return this.userManager.signinRedirectCallback().then(user => {
      this.user = user;
      this.loginChangedSubject.next(!!user && !user.expired);
      return user;
    });
  }

  logout() {
    this.userManager.signoutRedirect();
  }

  completeLogout() {
    this.user = null;
    this.loginChangedSubject.next(false);
    return this.userManager.signoutRedirectCallback();
  }

  getUser() {
    return this.userModel;
  }

  getAccessToken() {
    return this.accessToken;
  }

  isAdmin(): boolean {
    return true;
  }

  isUserAuthenticated() {
    this.isLoggedIn().then(value => {
      return value;
    });
  }
}
