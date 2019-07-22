import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, UrlSegment} from '@angular/router';

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.less']
})
export class FileExplorerComponent implements OnInit {
  private selectedBucket: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.url.subscribe((url: UrlSegment[]) => {
      this.selectedBucket = url[0].parameters.bucketName;
    });
  }

  filterBuckets(selectedBucket: string) {
    console.log(selectedBucket)
    if (selectedBucket === 'Choose Bucket') {
      alert('choose bucket name');
    } else {
      this.selectedBucket = selectedBucket.toLowerCase();
    }
  }
}
