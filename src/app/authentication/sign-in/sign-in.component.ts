import { Component } from '@angular/core';


@Component({
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent {
  constructor() { }

  private userNameOrEmail: string;
  private password: string;
  private mouseoverSubmit: boolean;

  signIn(formValues) {
    console.log(formValues);
  }

}
