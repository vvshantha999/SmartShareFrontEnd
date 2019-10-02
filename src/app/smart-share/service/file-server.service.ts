import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileServerService {

  private getBucketListUrl = 'http://localhost:8081/file-service/stub';

  constructor(private httpService: HttpClient) {
  }

  getBucketList() {
    return this.httpService.get(this.getBucketListUrl);
  }
}
