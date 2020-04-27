import {Component, OnInit} from '@angular/core';
import {MatButtonToggleChange, MatDialog} from '@angular/material';
import {DialogBoxComponent} from '../../customised-components/dialog-box/dialog-box.component';
import {FileServerService} from '../service/file-server.service';
import {ActivatedRoute} from '@angular/router';
import {Auth0ServiceService} from '../../authentication/auth0/auth0-service.service';
import {Bucket} from '../domain-models/bucket';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-bucket-list',
  templateUrl: './bucket-list.component.html',
  styleUrls: ['./bucket-list.component.less']
})
export class BucketListComponent implements OnInit {
  buckets;
  filteredBuckets;
  perspectiveButton;
  perspective: string;

  constructor(public dialog: MatDialog,
              private fileServerService: FileServerService,
              private oauth: Auth0ServiceService,
              private route: ActivatedRoute,
              private tostr: ToastrService
  ) {
    this.buckets = this.filteredBuckets = this.route.snapshot.data.buckets;
  }

  ngOnInit(): void {
    this.perspectiveButton = this.oauth.getAdminStatus();
    this.perspectiveButton ? this.perspective = 'admin' : this.perspective = 'user';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '50%',
      height: '30%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.bucketName !== null) {
        this.fileServerService.createBucket(new Bucket(result.bucketName)).subscribe(
          createBucketStatus => {
            console.log(createBucketStatus);
            if (createBucketStatus) {
              console.log('inside');
              const user = this.oauth.getUser();
              this.fileServerService.getBucketList(user._userName, user._emailAddress).subscribe(buckets => {
                this.filteredBuckets = buckets;
              });
            }
          },
          error => {
            // tslint:disable-next-line:max-line-length
            if (error.status === 412) {
              this.tostr.warning('"' + result.bucketName + '"' + ' already exists in S3 Global Namespace! Choose Another Bucket Name');
            } else {
              this.tostr.error('Bucket Creation Failed');
            }
          });
      }
    });
  }

  filterBuckets(bucketFilter: string) {
    if (bucketFilter === '') {
      this.filteredBuckets = this.buckets;
    } else {
      bucketFilter = bucketFilter.toLowerCase();
      this.filteredBuckets = this.filteredBuckets.filter((bucket: any) => bucket.name.toLowerCase().indexOf(bucketFilter) !== -1);
    }
  }

  changePerspective(event: MatButtonToggleChange) {
    this.perspective = event.value;
  }


}
