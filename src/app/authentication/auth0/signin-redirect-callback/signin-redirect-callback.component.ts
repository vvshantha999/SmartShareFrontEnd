import {Component, OnInit} from '@angular/core';
import {Auth0ServiceService} from '../auth0-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin-redirect-callback',
  templateUrl: './signin-redirect-callback.component.html',
  styleUrls: ['./signin-redirect-callback.component.less']
})
export class SigninRedirectCallbackComponent implements OnInit {

  constructor(private auth0Service: Auth0ServiceService, private router: Router) {
  }

  ngOnInit() {
    this.auth0Service.completeLogIn().then(value => {
      this.router.navigate(['/'], {replaceUrl: true});
    });
  }

}
