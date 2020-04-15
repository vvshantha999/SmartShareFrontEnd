import {Component, OnInit} from '@angular/core';
import {Auth0ServiceService} from '../auth0-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signout-redirect-callback',
  templateUrl: './signout-redirect-callback.component.html',
  styleUrls: ['./signout-redirect-callback.component.less']
})
export class SignoutRedirectCallbackComponent implements OnInit {

  constructor(private auth0Service: Auth0ServiceService, private router: Router) {
  }

  ngOnInit() {
    this.auth0Service.completeLogout().then(value => {
      this.router.navigate(['/'], {replaceUrl: true});
    });
  }

}
