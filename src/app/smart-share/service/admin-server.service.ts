import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {UsersMetadata} from '../domain-models/UsersMetadata';
import {BucketAccessRequestDto} from '../domain-models/BucketAccessRequestDto';

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

  approveBucketObjectAccessRequest(body) {
    const approveAccessRequestUrl = 'http://localhost:8081/administrationserver/object/approveAccessRequest';
    return this.httpService.put<any>(approveAccessRequestUrl, body, this.httpOptions)
      .pipe(
        tap(data => {
          console.log(data);
        })
      );
  }

  rejectBucketObjectAccessRequest(body) {
    const rejectAccessRequestUrl = 'http://localhost:8081/administrationserver/object/rejectAccessRequest';
    return this.httpService.put<any>(rejectAccessRequestUrl, body, this.httpOptions)
      .pipe(
        tap(data => {
          console.log(data);
        })
      );
  }

  deleteBucketObjectAccessRequest(body) {
    const deleteAccessRequestUrl = 'http://localhost:8081/administrationserver/object/deleteAccessRequest';
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

  getBucketObjectAccessRequestsAsUser(userId) {
    const getBucketObjectAccessRequestsAsUserUrl = 'http://localhost:8081/administrationserver/accessRequestsCreatedByUser';
    const params = new HttpParams()
      .set('userId', userId);
    return this.httpService.get<BucketAccessRequestDto>(getBucketObjectAccessRequestsAsUserUrl, {params});
  }

  getBucketObjectAccessRequestsAsOwner(ownerId) {
    const getBucketObjectAccessRequestsAsOwnerUrl = 'http://localhost:8081/administrationserver/accessRequestsOfOwner';
    const params = new HttpParams()
      .set('ownerId', ownerId);
    return this.httpService.get<BucketAccessRequestDto>(getBucketObjectAccessRequestsAsOwnerUrl, {params});

  }

  getBucketAccessRequestsAdmin() {
    const getBucketAccessRequestsAdminUrl = 'http://localhost:8081/administrationserver/bucket/bucketAccessRequestsForAdmin';
    return this.httpService.get<BucketAccessRequestDto>(getBucketAccessRequestsAdminUrl);
  }

  approveBucketAccessRequestsAdmin(body) {
    console.log(body);
    const approveBucketAccessRequestsAdminUrl = 'http://localhost:8081/administrationserver/bucket/approveAccessRequest';
    return this.httpService.post<boolean>(approveBucketAccessRequestsAdminUrl, body)
      .pipe(
        tap(data => {
          console.log(data);
        })
      );
  }

  rejectBucketAccessRequestsAdmin(body) {
    console.log(body);
    const rejectBucketAccessRequestsAdminUrl = 'http://localhost:8081/administrationserver/bucket/rejectAccessRequest';
    return this.httpService.post<boolean>(rejectBucketAccessRequestsAdminUrl, body)
      .pipe(
        tap(data => {
          console.log(data);
        })
      );
  }

  deleteBucketAccessRequestsAdmin(body) {
    console.log(body);
    const deleteBucketAccessRequestsAdminUrl = 'http://localhost:8081/administrationserver/bucket/deleteAccessRequest';
    return this.httpService.request('delete', deleteBucketAccessRequestsAdminUrl, {body})
      .pipe(
        tap(data => {
          console.log(data);
        })
      );
  }

  getFilesAccessedByUserInBucket(ownerId, bucketName) {
    const getFilesAccessesByUserInBucketUrl = 'http://localhost:8081/administrationserver/listOfUsersAccessingOwnersObject';
    const params = new HttpParams()
      .set('ownerId', ownerId)
      .set('bucketName', bucketName);
    return this.httpService.get<any>(getFilesAccessesByUserInBucketUrl, {params});
  }

  getUsersFileAccessedByOthers(userId, bucketName) {
    const getUsersFileAccessedByOthersUrl = 'http://localhost:8081/administrationserver/userFiles';
    const params = new HttpParams()
      .set('userId', userId)
      .set('bucketName', bucketName);
    return this.httpService.get<any>(getUsersFileAccessedByOthersUrl, {params});
  }


}
