import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {UsersMetadata} from '../domain-models/UsersMetadata';

@Injectable({
  providedIn: 'root'
})
export class AdminServerService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpService: HttpClient) {
  }

  createAccessRequest(body) {
    const createAccessRequestUrl = 'http://localhost:8081/administrationserver/object/createAccessRequest';
    return this.httpService.post<any>(createAccessRequestUrl, body, this.httpOptions)
      .pipe(
        tap(data => {
          console.log(data);
        })
      );
  }

  createBucketAccessRequest(body) {
    const createAccessRequestUrl = 'http://localhost:8081/administrationserver/bucket/createAccessRequest';
    return this.httpService.post<any>(createAccessRequestUrl, body, this.httpOptions)
      .pipe(
        tap(data => {
          console.log(data);
        }));
  }

  approveAccessRequest(body) {
    const approveAccessRequestUrl = 'http://localhost:8081/administrationserver/object/approveAccessRequest';
    return this.httpService.put<any>(approveAccessRequestUrl, body, this.httpOptions)
      .pipe(
        tap(data => {
          console.log(data);
        })
      );
  }

  rejectAccessRequest(body) {
    const rejectAccessRequestUrl = 'http://localhost:8081/administrationserver/object/rejectAccessRequest';
    return this.httpService.put<any>(rejectAccessRequestUrl, body, this.httpOptions)
      .pipe(
        tap(data => {
          console.log(data);
        })
      );
  }

  deleteAccessRequest(body) {
    const deleteAccessRequestUrl = 'http://localhost:8081/administrationserver/object/rejectAccessRequest';
    return this.httpService.request('delete', deleteAccessRequestUrl, {body})
      .pipe(
        tap(data => {
          console.log(data);
        })
      );
  }

  getUsers() {
    const getUserListUrl = 'http://localhost:8081/administrationserver/users';
    return this.httpService.get(getUserListUrl);
  }

  getUsersWithMetaData() {
    const getUserMetadataUrl = 'http://localhost:8081/administrationserver/usersMetadata';
    return this.httpService.get<UsersMetadata>(getUserMetadataUrl);
  }

  makeAdmin(body) {
    const makeAdminUrl = 'http://localhost:8081/administrationserver/makeAdmin';
    return this.httpService.post(makeAdminUrl, body)
      .pipe(
        tap(data => {
          console.log(data);
        })
      );
  }

  addUsers(body) {
    const addUserUrl = 'http://localhost:8081/administrationserver/bucket/addUser';
    return this.httpService.post<boolean>(addUserUrl, body)
      .pipe(
        tap(data => {
          console.log(data);
        })
      );
  }

  removeUser(body) {
    const removeUserUrl = 'http://localhost:8081/administrationserver/bucket/removeUser';
    return this.httpService.request('delete', removeUserUrl, {body})
      .pipe(
        tap(data => {
          console.log(data);
        })
      );
  }

  getBucketAccessRequestsAdmin() {
    const getBucketAccessRequestsAdminUrl = 'http://localhost:8081/administrationserver/usersMetadata';
    return this.httpService.get<any>(getBucketAccessRequestsAdminUrl);
  }
}
