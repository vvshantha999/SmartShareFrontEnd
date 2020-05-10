import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {AuthenticationService} from '../../authentication/authentication.service';
import {Auth0ServiceService} from '../../authentication/auth0/auth0-service.service';
import {User} from '../../smart-share/domain-models/User';
import {FileServerService} from '../../smart-share/service/file-server.service';
import {Subject} from 'rxjs';


@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.less']
})
export class MenuBarComponent implements OnInit {

  user: User = null;
  bucketFilter: string;
  listOfBuckets;
  isLoggedIn = false;
  // tslint:disable-next-line:variable-name
  private _isThisFileExplorerScreen = false;
  // tslint:disable-next-line:variable-name
  private _isThisBucketScreen = false;
  private fileExplorerScreenSubject = new Subject<boolean>();
  @Output() bucketNameToBeFilteredEmitter = new EventEmitter();
  selectedBucket = 'Choose Bucket';
  // tslint:disable-next-line:variable-name
  private _isThisRelationsScreen = false;
  fileExplorerScreenChanged = this.fileExplorerScreenSubject.asObservable();

  constructor(private router: Router, private auth: Auth0ServiceService, private authenticationService: AuthenticationService,
              private fileServerService: FileServerService) {
    this.auth.loginChanged.subscribe(value => {
      this.isLoggedIn = value;
    });
    this.auth.userAssigned.subscribe(value => {
      this.user = new User(value.profile.picture,
        value.profile.name.split(' ')[0],
        value.profile.email);
    });
    this.fileExplorerScreenChanged.subscribe(value => {

      this.fileServerService.getBucketList(this.auth.getUserId()).subscribe(buckets => {
        this.listOfBuckets = buckets;
      });
    });

  }

  get isThisBucketScreen() {
    return this._isThisBucketScreen;
  }


  get isThisRelationsScreen(): boolean {
    return this._isThisRelationsScreen;
  }

  set isThisRelationsScreen(value: boolean) {
    this._isThisRelationsScreen = value;
  }

  // tslint:disable-next-line:adjacent-overload-signatures
  set isThisBucketScreen(value: boolean) {
    this._isThisBucketScreen = value;
  }
  get isThisFileExplorerScreen(): any {
    return this._isThisFileExplorerScreen;
  }

  set isThisFileExplorerScreen(value: any) {
    this._isThisFileExplorerScreen = value;
  }

  ngOnInit() {
    this.auth.isLoggedIn().then(value => {
      this.isLoggedIn = value;
    });
    if (!!this.auth.getUser()) {
      this.user = this.auth.getUser();
    }
    // @ts-ignore
    this.router.events.subscribe((event: Event) => {
      (event instanceof NavigationEnd && event.url === '/dashboard/buckets') ?
        this._isThisBucketScreen = true : this._isThisBucketScreen = false;
      if (event instanceof NavigationEnd && event.url === '/dashboard/explorer') {
        this._isThisFileExplorerScreen = true;
        this.fileExplorerScreenSubject.next(true);
      } else {
        this._isThisFileExplorerScreen = false;
      }
      if (event instanceof NavigationEnd && event.url === '/dashboard/relationships') {
        this.fileExplorerScreenSubject.next(true);
        this._isThisRelationsScreen = true;
      } else {
        this._isThisRelationsScreen = false;
      }

    });

  }

  searchBucket() {
    const filter = this.isThisBucketScreen ? this.bucketFilter : this.selectedBucket;
    this.bucketNameToBeFilteredEmitter.emit(filter);
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }

}
