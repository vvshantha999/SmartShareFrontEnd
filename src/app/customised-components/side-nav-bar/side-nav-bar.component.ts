import {Component} from '@angular/core';
import {Auth0ServiceService} from '../../authentication/auth0/auth0-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.less']
})
export class SideNavBarComponent {

  isLoggedIn = false;

  constructor(private router: Router, private auth: Auth0ServiceService) {
    this.auth.loginChanged.subscribe(value => {
      this.isLoggedIn = value;
    });
  }

  opened = true;
  routeOutletComponentReference;

  onActivate(componentReference) {
    this.routeOutletComponentReference = componentReference;
  }

  filterBuckets(bucketFilter: string) {
    this.routeOutletComponentReference.filterBuckets(bucketFilter);
  }
}
