import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Auth0ServiceService} from './auth0/auth0-service.service';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private oauth: Auth0ServiceService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        // 'Content-Type' : 'application/json; charset=utf-8',
        // Accept       : '*/*',
        Authorization: `Bearer ${this.oauth.getAccessToken()}`
      }
    });
    return next.handle(req);
  }
}
