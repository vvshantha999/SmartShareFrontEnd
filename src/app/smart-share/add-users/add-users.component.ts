import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, UrlSegment} from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.less']
})
export class AddUsersComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
  }

  selectedBucket: string;

  users = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  bucket = [];

  ngOnInit() {
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

}
