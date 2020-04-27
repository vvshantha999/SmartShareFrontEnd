import {Component, OnInit} from '@angular/core';
import {AdminServerService} from '../service/admin-server.service';
import {UsersMetadata} from '../domain-models/UsersMetadata';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.less']
})
export class UsersListComponent implements OnInit {

  private users: UsersMetadata;
  // users = [
  //  {
  //   name: 'sethuram reddy',
  //   buckets: {
  //     count: 5,
  //     names: ['First Bucket', 'Second Bucket', 'Third Bucket', 'Fourth Bucket', 'Fifth Bucket']
  //   },
  //   bucketRequests: {
  //     count: 8
  //   }
  // },
  //   {
  //     name: 'Jibin Xavier',
  //     buckets: {
  //       count: 15,
  //       names: ['First Bucket', 'Second Bucket', 'Third Bucket', 'Fourth Bucket', 'Fifth Bucket', 'Sixth Bucket', 'Seventh Bucket']
  //     },
  //     bucketRequests: {
  //       count: 10
  //     }
  //   },
  //   {
  //     name: 'Robin Thomas',
  //     buckets: {
  //       count: 105,
  //       names: ['First Tub', 'Second Tub', 'Third Tub', 'Fourth Tub', 'Fifth Tub', 'Sixth Tub']
  //     },
  //     bucketRequests: {
  //       count: 130
  //     }
  //   },
  // ];

  constructor(private adminService: AdminServerService) {
  }

  ngOnInit() {
    this.adminService.getUsersWithMetaData().subscribe(users => {
      this.users = users;
    });
  }

}
