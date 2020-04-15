import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-bucket-management',
  templateUrl: './bucket-management.component.html',
  styleUrls: ['./bucket-management.component.less']
})
export class BucketManagementComponent implements OnInit {
  metadata: any;

  constructor() {
    this.metadata = {
      type: 'Bucket',
      displayedColumns: ['select', 'position', 'name', 'weight', 'symbol', 'action'],
      data: [
        {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
        {position: 2, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
        {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
        {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
        {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
        {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
        {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
        {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
        {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
        {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
        {position: 11, name: 'Neon', weight: 30.1797, symbol: 'Ne'},
        {position: 12, name: 'Neon', weight: 40.1797, symbol: 'Ne'}
      ],
      groupByColumns: ['name']
    };
  }

  ngOnInit() {
  }

}
