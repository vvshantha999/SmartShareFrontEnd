import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogBoxComponent} from '../../customised-components/dialog-box/dialog-box.component';
import {FileServerService} from '../service/file-server.service';


@Component({
  selector: 'app-bucket-list',
  templateUrl: './bucket-list.component.html',
  styleUrls: ['./bucket-list.component.less']
})
export class BucketListComponent implements OnInit {
  bucketNames = ['Sample Bucket'];

  constructor(public dialog: MatDialog, private fileServerService: FileServerService) {
  }
  filteredBuckets;

  ngOnInit() {
    this.fileServerService.getBucketList().subscribe(result => {
      console.log(result);
      this.filteredBuckets = result;
    });
    console.log('test--1', this.filteredBuckets);
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
