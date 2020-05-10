import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, UrlSegment} from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {FileServerService} from '../service/file-server.service';
import {Auth0ServiceService} from '../../authentication/auth0/auth0-service.service';
import {AdminServerService} from '../service/admin-server.service';
import {ToastrService} from 'ngx-toastr';
import {UserBucketMapping} from '../domain-models/UserBucketMapping';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.less']
})
export class AddUsersComponent implements OnInit {

  selectedBucket: string;
  users;
  buckets;
  userManged = [];
  matcardTitle = 'Select Bucket';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fileService: FileServerService,
              private oauth: Auth0ServiceService,
              private adminService: AdminServerService,
              private toastr: ToastrService) {
    this.selectedBucket = 'Select Bucket';
  }

  ngOnInit(): void {
    const userId = this.oauth.getUserId();
    this.fileService.getBucketList(userId).subscribe(value => {
      this.buckets = value;
    });

    this.route.url.subscribe((url: UrlSegment[]) => {
      this.selectedBucket = url[0].parameters.bucketName;
    });
    this.adminService.getUsers().subscribe(value => {
      this.users = value;
    });

  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  onChange() {

    if (!!this.selectedBucket) {
      this.matcardTitle = 'Bucket :';
    }
  }

  addUsers() {
    if (this.userManged.length === 0) {
      this.toastr.warning('Please drop users');
    } else {
      const users: any[] = [];
      this.userManged.forEach(value => {
        users.push(new UserBucketMapping(value.userId, value.userName, this.selectedBucket));
      });
      this.adminService.addUsers(users).subscribe(value => {
          if (value) {
            this.toastr.success('Users Added Successfully');
            this.userManged = [];
            this.router.navigate(['/dashboard/users']);
          }
        },
        error => this.toastr.error('Failed'));
    }
  }

  removeUser() {
    if (this.userManged.length === 0) {
      this.toastr.warning('Please drop users');
    }
    if (this.userManged.length > 1) {
      this.toastr.info('Only one user can be removed per operation');
    }
    if (this.userManged.length === 1) {
      const user = this.userManged[0];
      this.adminService.removeUser(new UserBucketMapping(user.userId, user.userName, this.selectedBucket)).subscribe(value => {

          if (value) {
            this.toastr.success('Users Deleted Successfully');
            this.userManged = [];
            this.router.navigate(['/dashboard/users']);
          }
        },
        error => this.toastr.error('Failed'));
    }
  }

  getUserName(user) {
    return user.userName.split('_')[0];
  }
}
