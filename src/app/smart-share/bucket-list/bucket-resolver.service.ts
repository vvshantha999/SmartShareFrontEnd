import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {FileServerService} from '../service/file-server.service';
import {Auth0ServiceService} from '../../authentication/auth0/auth0-service.service';

@Injectable({
  providedIn: 'root'
})
export class BucketResolver implements Resolve<any> {

  constructor(private fileService: FileServerService, private oauth: Auth0ServiceService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.fileService.getBucketList(this.oauth.getUser()._userName);
  }
}
