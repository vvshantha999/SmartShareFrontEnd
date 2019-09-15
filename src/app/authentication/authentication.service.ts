import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './domain-models/User';
import {Status} from './domain-models/Status';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private signUpUrl = 'http://localhost:8081/signUp';

  constructor(private httpService: HttpClient) {
  }

  registerUser(userInfo: User): Observable<Status> {
    return this.httpService.post<Status>(this.signUpUrl, userInfo, this.httpOptions);
    //   .pipe(
    //   catchError(this.handleError<Status>('registerUser', null))
    // );
  }

  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //       console.log(error);
  //       return of (result as T);
  //   };
  // }
}
