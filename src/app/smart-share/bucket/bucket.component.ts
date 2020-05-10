import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FileServerService} from '../service/file-server.service';
import {ToastrService} from 'ngx-toastr';
import {BucketAccessRequest} from '../domain-models/BucketAccessRequest';
import {Auth0ServiceService} from '../../authentication/auth0/auth0-service.service';
import {AdminServerService} from '../service/admin-server.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.less']
})
export class BucketComponent implements OnInit, OnChanges {

  constructor(private fileService: FileServerService,
              private toast: ToastrService,
              private auth: Auth0ServiceService,
              private adminService: AdminServerService,
              private router: Router) {
  }

  @Input() bucket: any;
  @Input() perspective: string;
  readChecked: any;
  writeChecked: any;

  ngOnInit() {
    this.readChecked = this.bucket.access.read;
    this.writeChecked = this.bucket.access.write;
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  deleteBucket() {

    this.fileService.deleteBucket(this.bucket.name).subscribe(value => {

      if (value) {
        this.toast.success('Bucket Deleted Successfully');
        this.reloadCurrentRoute();
      }
    });
  }

  createReadAccessRequest(access) {

    if (!this.readChecked) {
      const accessRequest = new BucketAccessRequest();
      accessRequest.bucketName = this.bucket.name;
      accessRequest.userId = this.auth.getUserId();
      accessRequest.access = access;
      this.adminService.createBucketAccessRequest(accessRequest).subscribe(value => {
        if (value) {
          this.toast.success('Bucket Access Request created Successfully');
          this.readChecked = false;
        } else {
          this.toast.error('Bucket Access Request Creation Failed');
        }
      });
    }
  }

  createWriteAccessRequest(access) {
    if (!this.writeChecked) {
      const accessRequest = new BucketAccessRequest();
      accessRequest.bucketName = this.bucket.name;
      accessRequest.userId = this.auth.getUserId();
      accessRequest.access = access;
      this.adminService.createBucketAccessRequest(accessRequest).subscribe(value => {
        if (value) {
          this.toast.success('Bucket Access Request created Successfully');
          this.writeChecked = false;
        } else {
          this.toast.error('Bucket Access Request Creation Failed');
        }
      });
    }
  }


  ngOnChanges(changes: SimpleChanges): void {

  }
}
