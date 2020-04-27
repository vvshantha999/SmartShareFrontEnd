import {Component, Input, OnInit} from '@angular/core';
import {Auth0ServiceService} from '../../authentication/auth0/auth0-service.service';
import {AdminServerService} from '../service/admin-server.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {

  private currentUser;
  private isAdmin;
  @Input() user: any;

  constructor(private auth0: Auth0ServiceService,
              private adminService: AdminServerService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.currentUser = this.auth0.getUser();
    this.isAdmin = this.auth0.getAdminStatus();
    console.log(this.isAdmin);
  }

  makeAdmin() {
    console.log(this.currentUser);
    this.adminService.makeAdmin(this.currentUser).subscribe(value => {
      if (value) {
        this.toastr.success('User made admin Successfully');
      }
    });
  }
}
