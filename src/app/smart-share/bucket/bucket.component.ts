import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.less']
})
export class BucketComponent implements OnInit {

  constructor() { }
  @Input() bucketName: string;
  admin = false;

  ngOnInit() {
  }
}
