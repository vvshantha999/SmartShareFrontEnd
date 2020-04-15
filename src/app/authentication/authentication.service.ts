import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../smart-share/domain-models/User';
import {Status} from '../smart-share/domain-models/Status';
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
  private registerUrl = 'http://localhost:8081/administrationserver/register';
  constructor(private httpService: HttpClient) {
  }

  registerUser(userInfo: User): Observable<Status> {
    // @ts-ignore
    return this.httpService.post<any>(this.registerUrl, userInfo, this.httpOptions)
      .pipe(
        tap(data => console.log(data))
      );
  }

}
