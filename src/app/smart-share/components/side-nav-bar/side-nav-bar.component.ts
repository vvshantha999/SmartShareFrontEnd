import { Component } from '@angular/core';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.less']
})
export class SideNavBarComponent {

  constructor() { }
  opened = true;
  routeOutletComponentReference;

  onActivate(componentReference) {
    this.routeOutletComponentReference = componentReference;
  }

  filterBuckets(bucketFilter: string) {
    this.routeOutletComponentReference.filterBuckets(bucketFilter);
  }
}
