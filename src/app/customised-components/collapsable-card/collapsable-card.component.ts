import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-collapsable-card',
  templateUrl: './collapsable-card.component.html',
  styleUrls: ['./collapsable-card.component.less']
})
export class CollapsableCardComponent implements OnInit {
  private visible: boolean;

  constructor() { }

  ngOnInit() {
  }

  toggleContent() {
    this.visible = !this.visible;
  }
}
