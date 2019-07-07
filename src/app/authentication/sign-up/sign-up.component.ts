import { Component} from '@angular/core';

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent  {

  constructor() { }

  private userName: string;
  private emailAddress: string;
  private password: string;
  private confirmPassword: string;
  private mouseoverSubmit: boolean;

  signUp(formValues) {
    console.log(formValues);
  }
}
