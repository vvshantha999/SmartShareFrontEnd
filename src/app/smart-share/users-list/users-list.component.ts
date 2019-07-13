import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.less']
})
export class UsersListComponent implements OnInit {

  users = [
   {
    name: 'sethuram reddy',
    buckets: {
      count: 5
    },
    bucketRequests: {
      count: 8
    },
    folderFileRequests: {
      count: 20
    }
  },
    {
      name: 'Jibin Xavier',
      buckets: {
        count: 15
      },
      bucketRequests: {
        count: 10
      },
      folderFileRequests: {
        count: 300
      }
    },
    {
      name: 'Robin Thomas',
      buckets: {
        count: 105
      },
      bucketRequests: {
        count: 130
      },
      folderFileRequests: {
        count: 10
      }
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
