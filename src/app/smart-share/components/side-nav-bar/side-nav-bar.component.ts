import { Component } from '@angular/core';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.less']
})
export class SideNavBarComponent {

  constructor() { }
  opened = true;
  bucketListComponentReference;

  onActivate(bucketListComponentReference) {
    this.bucketListComponentReference = bucketListComponentReference;
  }

  filterBuckets(bucketFilter: string) {
    this.bucketListComponentReference.filterBuckets(bucketFilter);
  }
}
