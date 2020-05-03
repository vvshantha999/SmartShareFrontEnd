import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import * as FileSaver from 'file-saver';


@Injectable({
  providedIn: 'root'
})
export class FileServerService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpService: HttpClient) {
  }

  getBucketList(userName, email) {
    const getBucketListUrl = 'http://localhost:8081/coreserver/buckets';
    const params = new HttpParams()
      .set('userName', userName)
      .set('email', email);
    return this.httpService.get(getBucketListUrl, {params});
  }

  createBucket(body): Observable<any> {
    console.log('Inside createBucket ', body);
    const createBucketUrl = 'http://localhost:8081/coreserver/bucket';
    return this.httpService.post<any>(createBucketUrl, body, this.httpOptions)
      .pipe(
        tap(data => {
          console.log(data);
        })
      );
  }

  deleteBucket(bucketName) {
    const deleteBucketUrl = 'http://localhost:8081/coreserver/bucket';
    const params = new HttpParams()
      .set('bucketName', bucketName);
    return this.httpService.delete(deleteBucketUrl, {params});
  }

  getBucketObjects(userId, bucketName) {
    const getBucketListUrl = 'http://localhost:8081/coreserver/objects';
    const params = new HttpParams()
      .set('userId', userId)
      .set('bucketName', bucketName);
    return this.httpService.get(getBucketListUrl, {params});
  }

  downloadFile(fileName, objectName, bucketName): Subscription {
    console.log('inside servc');
    const downloadFileUrl = 'http://localhost:8081/coreserver/file/download';
    const params = new HttpParams()
      .set('fileName', fileName)
      .set('objectName', objectName)
      .set('bucketName', bucketName);
    const headers = new HttpHeaders({
      Return: 'resource'
    });
    return this.httpService.get(downloadFileUrl, {headers, params, responseType: 'blob'})
      .subscribe(
        (response) => {
          // console.log(resp.headers.get('content-disposition'));
          FileSaver.saveAs(response, fileName);
        });
  }

  downloadFolder(objectsToDownload): Observable<any> {
    console.log('inside');
    const downloadFolderUrl = 'http://localhost:8081/coreserver/folder/download';
    return this.httpService.post<any>(downloadFolderUrl, objectsToDownload, this.httpOptions);
  }

  uploadFile(body): Observable<any> {
    console.log('Inside upload file', body);
    const uploadUrl = 'http://localhost:8081/coreserver/object';
    return this.httpService.post<any>(uploadUrl, body, this.httpOptions)
      .pipe(
        tap(data => {
          console.log(data);
        })
      );
  }

  deleteFile(objectName, bucketName, ownerId): Observable<any> {
    console.log('inside');
    const deleteFileUrl = 'http://localhost:8081/coreserver/file';
    const params = new HttpParams()
      .set('objectName', objectName)
      .set('bucketName', bucketName)
      .set('ownerId', ownerId);
    return this.httpService.delete(deleteFileUrl, {params});
  }

  deleteFolder(deleteObjectsRequest) {
    const deleteFolderUrl = 'http://localhost:8081/coreserver/folder';
    return this.httpService.request('delete', deleteFolderUrl, {body: deleteObjectsRequest});
  }

  createNewFolder(body) {
    const newFolderUrl = 'http://localhost:8081/coreserver/folder/empty';
    return this.httpService.post<any>(newFolderUrl, body, this.httpOptions)
      .pipe(
        tap(data => {
          console.log(data);
        })
      );
  }


}
