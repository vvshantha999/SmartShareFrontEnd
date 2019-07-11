import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.less']
})
export class MenuBarComponent implements OnInit {
  user: any;
  bucketFilter: string;

  constructor() {}
  @Output() bucketNameToBeFilteredEmitter = new EventEmitter();

  ngOnInit() {
    const user = {
      name: 'sethuram'
    };
    this.user = user;
  }

  searchBucket() {
    this.bucketNameToBeFilteredEmitter.emit(this.bucketFilter);
  }

}
