import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileServerService {

  private getBucketListUrl = 'http://localhost:8081/file-service/stub';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private downloadFileUrl = 'http://localhost:8081/file-service/file';

  constructor(private httpService: HttpClient) {
  }

  getBucketList() {
    return this.httpService.get(this.getBucketListUrl);
  }

  uploadFile(body): Observable<any> {
    console.log('Inside upload file');
    const testUrl = 'http://localhost:8084/file';
    return this.httpService.post<any>(testUrl, body, this.httpOptions)
      .pipe(
        tap(data => {
          console.log(data);
        })
      );
  }

}
