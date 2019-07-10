import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.less']
})
export class MenuBarComponent implements OnInit {
  user: any;

  constructor() {}

  ngOnInit() {
    const user = {
      name: 'sethuram'
    };
    this.user = user;
  }

}
