import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.less']
})
export class DialogBoxComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit() {
  }
  onCancelClick(): void {
    this.dialogRef.close();
  }

  createBucket(createBucketForm: NgForm) {
    this.dialogRef.close(createBucketForm);
  }
}
