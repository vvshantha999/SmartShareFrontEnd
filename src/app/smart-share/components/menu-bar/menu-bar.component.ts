import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.less']
})
export class MenuBarComponent implements OnInit {

  user: any;
  bucketFilter: string;
  // tslint:disable-next-line:variable-name
  private _isThisBucketScreen = true;

  get isThisBucketScreen() {
    return this._isThisBucketScreen;
  }

  set isThisBucketScreen(value) {
    this._isThisBucketScreen = value;
  }

  constructor(private router: Router) {
  }

  @Output() bucketNameToBeFilteredEmitter = new EventEmitter();

  ngOnInit() {
    const user = {
      name: 'sethuram'
    };
    this.user = user;
    // @ts-ignore
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd && event.url === '/dashboard/buckets') {
        this._isThisBucketScreen = true;
      } else {
        this._isThisBucketScreen = false;
      }
    });
  }

  searchBucket() {
    this.bucketNameToBeFilteredEmitter.emit(this.bucketFilter);
  }

}
