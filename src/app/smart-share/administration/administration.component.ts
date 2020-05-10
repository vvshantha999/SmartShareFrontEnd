import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';


@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.less']
})
export class AdministrationComponent implements OnInit {
  margin: any;

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url === '/dashboard/administration/bucket') {
          this.margin = 'mt-5';
        } else {
          this.margin = 'mt-2';
        }
      }
    });
  }

  ngOnInit() {
    // this.perspective = 'owner';
    // // this.route.url.subscribe((url: UrlSegment[]) => {
    //     if (url[0].parameters.filter) {
    //       this.userNameFilter = url[0].parameters.filter;
    //       this.applyFilter(this.userNameFilter);
    //       this.applyFilter('He');
    //       this.filteredData = this.dataSource.filteredData;
    //       this.dataSource.data = this.filteredData;
    //     } else {
    //       this.dataSource.data = this.unfilteredData.data;
    //     }
    //   });
  }

  //
  // changePerspective(event: MatButtonToggleChange) {
  //   this.perspective = event.value;
  //   // this.fileAndFolderManagementComponent.perspective = this.perspective;
  //   // FileAndFolderManagementComponent.prototype.perspective = this.perspective;
  //   //
  //   // this.childReference.perspective = this.perspective;
  //   //
  // }
  // emitPerspectiveEvent(event) {
  //   event.perspective = this.perspective;
  // }


}
