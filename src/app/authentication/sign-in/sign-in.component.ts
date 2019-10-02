import {Component} from '@angular/core';
import {User} from '../domain-models/User';
import {AuthenticationService} from '../authentication.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';


@Component({
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent {

  private userInfo: User;

  private mouseoverSubmit: boolean;

  constructor(private auth: AuthenticationService, private router: Router, private toastr: ToastrService) {
  }

  // tslint:disable-next-line:max-line-length

  signIn(formValues) {
    console.log(formValues);
    this.userInfo = new User('', '', formValues.password);

    // tslint:disable-next-line:max-line-length
    if (formValues.userNameOrEmail.toString().match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      this.userInfo._emailAddress = formValues.userNameOrEmail;
    } else {
      this.userInfo._userName = formValues.userNameOrEmail;
    }

    this.auth.signInUser(this.userInfo).subscribe(result => {
        if (result !== null) {
          this.router.navigateByUrl('/dashboard');
        }
      }, error => {
        this.toastr.error('Status: Failed!', 'User Sign In');
      }
    );
  }

}
