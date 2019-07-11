import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bucket-list',
  templateUrl: './bucket-list.component.html',
  styleUrls: ['./bucket-list.component.less']
})
export class BucketListComponent implements OnInit {

  constructor() { }
  bucketNames = ['First Bucket', 'Second Bucket', 'Third Bucket', 'Fourth Bucket']
  ngOnInit() {
  }

}
