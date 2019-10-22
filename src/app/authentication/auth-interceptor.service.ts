import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  private urlsToSkipForAddingJwtTokens = ['signIn', 'signUp'];

  constructor(private authenticationService: AuthenticationService) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if (!(this.urlsToSkipForAddingJwtTokens.includes(req.url.split('/')[req.url.split('/').length - 1]))) {
    //   console.log(this.authenticationService.getToken());
    //   req = req.clone({
    //     setHeaders: {
    //       Authentication: `${this.authenticationService.getToken()}`,
    //     }, withCredentials: true
    //   });
    // }
    console.log(req);
    return next.handle(req);
  }
}
