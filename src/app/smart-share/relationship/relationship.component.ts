import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-relationship',
  templateUrl: './relationship.component.html',
  styleUrls: ['./relationship.component.less']
})
export class RelationshipComponent implements OnInit {
  private perspective;
  private perspectiveLabel;

  constructor() {
  }

  ngOnInit() {
    this.perspective = false;
    this.perspectiveLabel = 'User';
  }

  changePerspective() {
    if (this.perspective === true) {
      this.perspectiveLabel = 'Owner';
    } else {
      this.perspectiveLabel = 'User';
    }
  }


}
