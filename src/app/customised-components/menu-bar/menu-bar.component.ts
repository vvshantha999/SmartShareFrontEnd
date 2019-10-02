import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {AuthenticationService} from '../../authentication/authentication.service';

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

  constructor(private router: Router, private auth: AuthenticationService) {
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
    console.log(this.auth.role);
    console.log(this.auth.userName);
    this.user = {
      role: this.auth.role,
      name: this.auth.userName
    };
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
