import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';

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
}
