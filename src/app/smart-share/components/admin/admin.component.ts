import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {ActivatedRoute, UrlSegment} from '@angular/router';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Hydrogen', weight: 1.0079, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {

  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol', 'action'];
  unfilteredData = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  filteredData;
  dataSource = new MatTableDataSource<PeriodicElement>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  private userNameFilter: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.route.url.subscribe((url: UrlSegment[]) => {
      if (url[0].parameters.filter) {
        this.userNameFilter = url[0].parameters.filter;
        this.applyFilter(this.userNameFilter);
        this.applyFilter('He');
        this.filteredData = this.dataSource.filteredData;
        this.dataSource.data = this.filteredData;
      } else {
        this.dataSource.data = this.unfilteredData.data;
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.data = this.unfilteredData.data;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  displayRow(row: any) {
    console.log(row);
  }

  acceptRequest(row) {
    console.log(row);
  }

  rejectRequest(row) {
    console.log(row);
  }

  getDisplayedColumns(): string[] {
    return this.displayedColumns.filter(column => column !== 'action');
    // const isMobile = this.currentDisplay === 'mobile';
    // return this.columnDefinitions
    //   .filter(cd => !isMobile || cd.showMobile)
    //   .map(cd => cd.def);
  }
}





