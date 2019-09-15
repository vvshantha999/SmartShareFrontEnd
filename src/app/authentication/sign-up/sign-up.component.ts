import {Component} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {User} from '../domain-models/User';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent {

  private userInfo: User;

  private mouseoverSubmit: boolean;

  private errorMessage: string;

  constructor(private auth: AuthenticationService, private router: Router, private toastr: ToastrService) {
  }

  signUp(formValues) {
    console.log(formValues.value);
    this.userInfo = new User(formValues.value.userName, formValues.value.emailAddress, formValues.value.password);
    this.auth.registerUser(this.userInfo).subscribe(result => {
        if (result.message === 'Success') {
          this.router.navigateByUrl('/signin');
        }
      }, error => {
        this.errorMessage = error.error.message;
        if (this.errorMessage.includes('E11000')) {
          this.toastr.error('Status: Failed!' + '\n' + 'Reason: ' + 'Email Exists', 'User Registration');
        } else {
          this.toastr.error('Status: Failed!' + '\n' + 'Reason: ' + this.errorMessage, 'User Registration');
        }
      }
    );
  }
}
