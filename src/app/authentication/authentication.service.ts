import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './domain-models/User';
import {Status} from './domain-models/Status';
import {tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    observe: 'response'
  };
  public userName;
  public role;
  private authenticationToken;
  private signUpUrl = 'http://localhost:8081/authenticate/signUp';
  private signInUrl = 'http://localhost:8081/authenticate/signIn';

  constructor(private httpService: HttpClient) {
  }

  registerUser(userInfo: User): Observable<Status> {
    // @ts-ignore
    return this.httpService.post<Status>(this.signUpUrl, userInfo, this.httpOptions);
  }

  // tslint:disable-next-line:ban-types
  // @ts-ignore
  signInUser(userInfo: User): Observable<any> {
    // tslint:disable-next-line:ban-types
    // @ts-ignore
    return this.httpService.post<any>(this.signInUrl, userInfo, this.httpOptions)
      .pipe(
        tap(data => {
          console.log(data);
          // @ts-ignore
          this.authenticationToken = data.headers.get('Authentication');
          // @ts-ignore
          this.userName = data.body.userName;
          // @ts-ignore
          this.role = data.body.role;
        })
      );
  }

  getToken() {
    return this.authenticationToken;
  }
}
