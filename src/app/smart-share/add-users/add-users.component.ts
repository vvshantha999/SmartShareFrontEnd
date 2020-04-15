import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, UrlSegment} from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {FileServerService} from '../service/file-server.service';
import {Auth0ServiceService} from '../../authentication/auth0/auth0-service.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.less']
})
export class AddUsersComponent implements OnInit {

  selectedBucket: string;
  foods: any = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  users = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];
  buckets;
  userManged = [];
  matcardTitle = 'Select Bucket';

  constructor(private route: ActivatedRoute, private fileService: FileServerService, private oauth: Auth0ServiceService) {
    this.selectedBucket = 'Select Bucket';
  }

  ngOnInit(): void {
    this.fileService.getBucketList(this.oauth.getUser()._userName).subscribe(value => {
      this.buckets = value;
    });
    console.log(this.buckets);
    this.route.url.subscribe((url: UrlSegment[]) => {
      this.selectedBucket = url[0].parameters.bucketName;
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
    console.log(this.selectedBucket);
    if (!!this.selectedBucket) {
      this.matcardTitle = 'Bucket :';
    }
  }

  addUsers() {
    console.log(this.userManged);
  }


}
