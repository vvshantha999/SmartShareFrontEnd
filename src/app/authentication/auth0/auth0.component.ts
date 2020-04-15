import {Component, OnInit} from '@angular/core';
import {Auth0ServiceService} from './auth0-service.service';

@Component({
  selector: 'app-auth0',
  templateUrl: './auth0.component.html',
  styleUrls: ['./auth0.component.less']
})
export class Auth0Component implements OnInit {

  isLoggedIn = false;

  constructor(private auth0Service: Auth0ServiceService) {
    this.auth0Service.loginChanged.subscribe(value => {
      this.isLoggedIn = value;
    });
  }

  ngOnInit() {
    this.auth0Service.isLoggedIn().then(value => {
      this.isLoggedIn = value;
    });
  }


}
