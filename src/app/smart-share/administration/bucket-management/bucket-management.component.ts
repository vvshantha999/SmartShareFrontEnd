import {Component, OnInit} from '@angular/core';
import {AdminServerService} from '../../service/admin-server.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-bucket-management',
  templateUrl: './bucket-management.component.html',
  styleUrls: ['./bucket-management.component.less']
})
export class BucketManagementComponent implements OnInit {
  metadata: any;

  constructor(private adminService: AdminServerService, private toast: ToastrService) {
  }

  fetchBucketAccessRequests() {
    this.adminService.getBucketAccessRequestsAdmin().subscribe(value => {
      this.metadata = {
        type: 'Bucket',
        displayedColumns: ['select', 'userName', 'bucketName', 'bucketAccessType', 'status', 'action'],
        data: value,
        groupByColumns: ['bucketName']
      };
    });
  }

  ngOnInit() {
    this.fetchBucketAccessRequests();
  }

  handleRequest(row) {

    if (row.type === 'accept') {
      this.adminService.approveBucketAccessRequestsAdmin(row.content[0]).subscribe(approveStatus => {
          if (approveStatus) {
            this.toast.success('Bucket Access Request Approved Successfully');
            this.fetchBucketAccessRequests();
          }
        },
        error => this.toast.error('Failed')
      );
    }
    if (row.type === 'reject') {
      this.adminService.rejectBucketAccessRequestsAdmin(row.content[0]).subscribe(approveStatus => {
          if (approveStatus) {
            this.toast.success('Bucket Access Request Rejected Successfully');
            this.fetchBucketAccessRequests();
          }
        },
        error => this.toast.error('Failed')
      );
    }
    if (row.type === 'delete') {
      this.adminService.deleteBucketAccessRequestsAdmin(row.content[0]).subscribe(approveStatus => {
          if (approveStatus) {
            this.toast.success('Bucket Access Request Deleted Successfully');
            this.fetchBucketAccessRequests();
          }
        },
        error => this.toast.error('Failed')
      );
    }
  }
}
