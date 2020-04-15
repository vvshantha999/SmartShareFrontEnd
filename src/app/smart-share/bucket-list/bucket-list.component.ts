import {Component, OnInit} from '@angular/core';
import {MatButtonToggleChange, MatDialog} from '@angular/material';
import {DialogBoxComponent} from '../../customised-components/dialog-box/dialog-box.component';
import {FileServerService} from '../service/file-server.service';
import {ActivatedRoute} from '@angular/router';
import {Auth0ServiceService} from '../../authentication/auth0/auth0-service.service';


@Component({
  selector: 'app-bucket-list',
  templateUrl: './bucket-list.component.html',
  styleUrls: ['./bucket-list.component.less']
})
export class BucketListComponent implements OnInit {
  buckets;
  filteredBuckets;
  perspectiveButton; // default false
  perspective: string;

  constructor(public dialog: MatDialog,
              private fileServerService: FileServerService,
              private oauth: Auth0ServiceService,
              private route: ActivatedRoute) {
    this.buckets = this.filteredBuckets = this.route.snapshot.data.buckets;
  }

  ngOnInit(): void {
    this.perspectiveButton = this.oauth.isAdmin(); // have to implement
    this.perspectiveButton ? this.perspective = 'admin' : this.perspective = 'user';

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '50%',
      height: '30%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.bucketName !== null) {
        this.buckets.push(result.bucketName);
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
