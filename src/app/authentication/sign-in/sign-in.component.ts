import { Component } from '@angular/core';


@Component({
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent {

  private userNameOrEmail: string;
  private password: string;
  private mouseoverSubmit: boolean;

  constructor() { }

  signIn(formValues) {
    console.log(formValues);
  }

}
