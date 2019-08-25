import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.less']
})
export class MenuBarComponent implements OnInit {

  user: any;
  bucketFilter: string;
  listOfBuckets = ['First', 'Second', 'Third'];
  // tslint:disable-next-line:variable-name
  private _isThisBucketScreen = true;
  // tslint:disable-next-line:variable-name
  private _isThisFileExplorerScreen = false;
  @Output() bucketNameToBeFilteredEmitter = new EventEmitter();
  selectedBucket = 'Choose Bucket';

  constructor(private router: Router) {
  }
  get isThisBucketScreen() {
    return this._isThisBucketScreen;
  }

  set isThisBucketScreen(value) {
    this._isThisBucketScreen = value;
  }
  get isThisFileExplorerScreen(): any {
    return this._isThisFileExplorerScreen;
  }

  set isThisFileExplorerScreen(value: any) {
    this._isThisFileExplorerScreen = value;
  }

  ngOnInit() {
    const user = {
      name: 'sethuram'
    };
    this.user = user;
    // @ts-ignore
    this.router.events.subscribe((event: Event) => {
      (event instanceof NavigationEnd && event.url === '/dashboard/buckets') ?
        this._isThisBucketScreen = true :  this._isThisBucketScreen = false;
      (event instanceof NavigationEnd && event.url === '/dashboard/explorer') ?
        this._isThisFileExplorerScreen = true :  this._isThisFileExplorerScreen = false;
    });
  }

  searchBucket() {
    const filter = this.isThisBucketScreen ? this.bucketFilter : this.selectedBucket;
    this.bucketNameToBeFilteredEmitter.emit(filter);
  }

}
