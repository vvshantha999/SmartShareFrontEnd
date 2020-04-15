import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.less']
})
export class BucketComponent implements OnInit {

  constructor() {
  }

  @Input() bucket: any;
  @Input() perspective: string;
  readChecked: any;
  writeChecked: any;

  ngOnInit() {
    this.bucket.access === 'read' ? this.readChecked = true : this.writeChecked = true;
  }

}
