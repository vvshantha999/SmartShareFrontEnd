export class User {


  private userName: string;

  private emailAddress: string;

  private password: string;

  constructor(userName: string, emailAddress: string, password: string) {
    this.userName = userName;
    this.emailAddress = emailAddress;
    this.password = password;
  }

  set _userName(value: string) {
    this.userName = value;
  }

  set _emailAddress(value: string) {
    this.emailAddress = value;
  }

}
