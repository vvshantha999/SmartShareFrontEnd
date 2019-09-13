import {Component} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {User} from '../domain-models/User';

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent  {

  private userInfo: User;

  private mouseoverSubmit: boolean;

  constructor(private auth: AuthenticationService) {
  }

  signUp(formValues) {
    console.log(formValues.value);
    this.userInfo = new User(formValues.value.userName, formValues.value.emailAddress, formValues.value.password);
    this.auth.registerUser(this.userInfo).subscribe();
  }
}
