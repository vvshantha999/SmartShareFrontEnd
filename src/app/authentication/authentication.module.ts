import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faAt, faCheck, faKey, fas, faSignInAlt, faSignOutAlt, faUser} from '@fortawesome/free-solid-svg-icons';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {Auth0Component} from './auth0/auth0.component';
import {MatButtonModule} from '@angular/material';
import {SigninRedirectCallbackComponent} from './auth0/signin-redirect-callback/signin-redirect-callback.component';
import {SignoutRedirectCallbackComponent} from './auth0/signout-redirect-callback/signout-redirect-callback.component';


@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [Auth0Component, SigninRedirectCallbackComponent, SignoutRedirectCallbackComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'signin-callback', component: SigninRedirectCallbackComponent},
      {path: 'signout-callback', component: SignoutRedirectCallbackComponent},
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
    ]),
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    MatButtonModule,
  ]
})
export class AuthenticationModule {
  constructor() {
    library.add(fas);
    library.add(faUser, faKey, faAt, faCheck, faSignInAlt, faSignOutAlt);
    library.add(faGithub);
  }
}
