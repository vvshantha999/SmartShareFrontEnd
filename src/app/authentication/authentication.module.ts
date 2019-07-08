import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import {RouterModule} from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';
import {FormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faAt, faCheck, faKey, fas, faUser} from '@fortawesome/free-solid-svg-icons';
import {ConfirmPasswordValidator} from './sign-up/confirm-password-validator/confirm-password-validator.directive';




@NgModule({
  declarations: [SignUpComponent, SignInComponent, ConfirmPasswordValidator],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'signin', component: SignInComponent},
      {path: 'signup', component: SignUpComponent}
      // {path: '', redirectTo: '/signin', pathMatch: 'full'}
    ]),
    FormsModule,
    FontAwesomeModule
  ]
})
export class AuthenticationModule {
  constructor() {
    library.add(fas);
    library.add(faUser, faKey, faAt, faCheck);
  }
}
