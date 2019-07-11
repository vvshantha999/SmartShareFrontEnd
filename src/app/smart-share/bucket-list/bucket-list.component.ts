import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogBoxComponent} from '../components/dialog-box/dialog-box.component';


@Component({
  selector: 'app-bucket-list',
  templateUrl: './bucket-list.component.html',
  styleUrls: ['./bucket-list.component.less']
})
export class BucketListComponent implements OnInit {
  constructor(public dialog: MatDialog) {
    this.filteredBuckets = this.bucketNames;
  }
  bucketNames = ['First Bucket', 'Second Bucket', 'Third Bucket', 'Fourth Bucket']
  filteredBuckets;
  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '50%',
      height: '30%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.bucketName !==  null) {
      this.bucketNames.push(result.bucketName);
      }
    });
  }

  filterBuckets(bucketFilter: string) {
    if (bucketFilter === '') {
      this.filteredBuckets = this.bucketNames;
    } else {
      bucketFilter = bucketFilter.toLowerCase();
      this.filteredBuckets = this.filteredBuckets.filter((bucketName: string) => bucketName.toLowerCase().indexOf(bucketFilter) !== -1);
    }
  }
}
