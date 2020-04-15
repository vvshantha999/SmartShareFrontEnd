export class User {


  private picture: string;
  private userName: string;
  private email: string;


  constructor(picture: string, userName: string, email: string) {
    this.picture = picture;
    this.userName = userName;
    this.email = email;
  }

  get _picture(): string {
    return this.picture;
  }

  set _picture(value: string) {
    this.picture = value;
  }

  get _userName(): string {
    return this.userName;
  }

  set _userName(value: string) {
    this.userName = value;
  }

  get _emailAddress(): string {
    return this.email;
  }

  set _emailAddress(value: string) {
    this.email = value;
  }
}
