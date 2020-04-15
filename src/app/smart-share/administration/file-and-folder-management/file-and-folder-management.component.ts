import {Component} from '@angular/core';
import {AdminServerService} from '../../service/admin-server.service';
import {Request} from '../../domain-models/Request';
import {NavigationEnd, Router} from '@angular/router';
import {MatButtonToggleChange} from '@angular/material';

@Component({
  selector: 'app-file-and-folder-management',
  templateUrl: './file-and-folder-management.component.html',
  styleUrls: ['./file-and-folder-management.component.less']
})
export class FileAndFolderManagementComponent {
  metadata: any;
  perspective: any;
  perspectiveButton: any;

  constructor(private adminService: AdminServerService, private router: Router) {
    this.metadata = {
      type: 'Bucket Object',
      displayedColumns: ['select', 'position', 'name', 'weight', 'action'],
      data: [
        {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
        {position: 2, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
        {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
        {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
        {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
        {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
        {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
        {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
        {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
        {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
      ],
      groupByColumns: ['name']
    };
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url === '/dashboard/administration/userManged') {
          this.perspectiveButton = false;
        } else {
          this.perspectiveButton = true;
        }
      }
    });
    this.perspective = 'owner';
  }

  handleRequest(request: Request) {
    console.log(request);
    // have to handle content type to match with bucketObject Access Request
    // switch (request.type) {
    //   case 'accept':
    //     this.adminService.approveAccessRequest(request.content);
    //     break;
    //   case 'reject':
    //     this.adminService.rejectAccessRequest(request.content);
    //     break;
    //   case 'delete':
    //     this.adminService.deleteAccessRequest(request.content);
    //     break;
    //   default:
    //     console.log('No respective handlers available for given request');
    // }
  }

  changePerspective(event: MatButtonToggleChange) {
    this.perspective = event.value;
    console.log(this.perspective);
    if (this.perspective === 'user') {
      console.log('inside');
      this.metadata = {
        type: 'Bucket Object',
        displayedColumns: ['select', 'position', 'name', 'weight', 'action'],
        data: [
          {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
          {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
          {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
          {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
          {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
          {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'}
        ],
        groupByColumns: ['name']
      };
    } else {
      this.metadata = {
        type: 'Bucket Object',
        displayedColumns: ['select', 'position', 'name', 'weight', 'action'],
        data: [
          {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
          {position: 2, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
          {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
          {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
          {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
          {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
          {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
          {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
          {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
          {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
        ],
        groupByColumns: ['name']
      };
    }
  }
}
