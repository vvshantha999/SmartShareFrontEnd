import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {FileServerService} from '../service/file-server.service';
import {Auth0ServiceService} from '../../authentication/auth0/auth0-service.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BucketObjectResolver implements Resolve<any> {

  constructor(private fileService: FileServerService, private oauth: Auth0ServiceService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    if (route.paramMap.get('bucketName') === null) {
      return [];
    } else {
      return this.fileService.getBucketObjects(this.oauth.getUserId(), route.paramMap.get('bucketName'));
    }
  }
}

