import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatCheckboxChange, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {ActivatedRoute, UrlSegment} from '@angular/router';
import {Request} from '../../smart-share/domain-models/Request';
import {ToastrService} from 'ngx-toastr';


export class Group {
  level = 0;
  id: number;
  row: any;
  parent: Group;
  expanded = true;

  get visible(): boolean {
    return !this.parent || (this.parent.visible && this.parent.expanded);
  }
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit, OnChanges {


  unfilteredData;
  selection = new SelectionModel<any>(true, []);
  dataSource = new MatTableDataSource<any | Group>([]);
  @Input()
  perspective;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  private userNameFilter: string;
  @Input()
  metadata: any;
  @Output() requestEmitter = new EventEmitter();
  filteredColumns;
  groupByColumns;
  selectedRows: any[] = [];
  acceptButtonShow: boolean;
  rejectButtonShow: boolean;
  deleteButtonShow = false;
  margin: any;
  private dataSourceFilter: string;
  private pendingCount = 0;
  private acceptedCount = 0;
  private rejectedCount = 0;
  private totalCount = 0;

  constructor(private route: ActivatedRoute, private toastr: ToastrService) {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.margin = 'mt-2';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.unfilteredData = new MatTableDataSource<any>(this.metadata.data);
    this.groupByColumns = this.metadata.groupByColumns;
    this.filteredColumns = this.metadata.displayedColumns.filter(column => (column !== 'action') && (column !== 'select'));
    const dataSource = this.addGroups(this.metadata.data.filter(value => value.status === 'In Progress'), this.groupByColumns);
    this.dataSource.data = (dataSource.length === 1) ? [] : dataSource;
    this.totalCount = this.metadata.data.length;

    // tslint:disable-next-line:max-line-length
    this.dataSource.filterPredicate = (this.metadata.type === 'Bucket') ? this.customFilterPredicate.bind(this) : this.customFilterPredicateBucketObject.bind(this);
    this.pendingCount = this.metadata.data.filter(value => value.status === 'In Progress').length;
    this.acceptedCount = this.metadata.data.filter(value => value.status === 'Approved').length;
    this.rejectedCount = this.metadata.data.filter(value => value.status === 'Rejected').length;
    if (this.metadata.type === 'Bucket' || this.perspective === 'user') {
      this.acceptButtonShow = false;
      this.rejectButtonShow = false;
    } else {
      this.acceptButtonShow = true;
      this.rejectButtonShow = true;
    }
  }


  ngOnInit() {
    this.route.url.subscribe((url: UrlSegment[]) => {
      if (url[0].parameters.filter) {
        this.margin = 'mt-5';
        this.userNameFilter = url[0].parameters.filter;
        this.applyFilter(this.userNameFilter);  // have to change the code with parameter according to retrieved data in below filter
        this.dataSource.data = this.addGroups(this.metadata.data.filter(value => value.symbol === 'Ne'), this.groupByColumns);

      }
    });
  }

  groupHeaderClick(row) {
    row.expanded = !row.expanded;
    this.dataSource.filter = (this.metadata.type === 'Bucket') ? performance.now().toString() : row;
  }

  customFilterPredicateBucketObject(data: any, filter: string): boolean {
    // console.log(data.expanded);
    // if (data instanceof Group ) {return  true; }
    // if ( !(data instanceof Group) && data.parentId === filter['id']) {
    //   return false;
    // }
    return true;
  }

  isGroup(index, item): boolean {
    return item.level;
  }

  uniqueBy(a, key) {
    const seen = {};
    return a.filter((item) => {
      const k = key(item);
      return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    });
  }

  addGroups(data: any[], groupByColumns: string[]): any[] {
    const rootGroup = new Group();
    return this.getSublevel(data, 0, groupByColumns, rootGroup);
  }

  getSublevel(data: any[], level: number, groupByColumns: string[], parent: Group): any[] {
    // Recursive function, stop when there are no more levels.
    if (level >= groupByColumns.length) {
      return data;
    }
    let groups = [];
    if (this.metadata.type !== 'Bucket') {
      const groupNames = [];
      groups = data.map(
        (row, index) => {
          if (row[groupByColumns[0]].endsWith('/')) {
            const result = new Group();
            result.level = level + 1;
            result.parent = parent;
            result.id = index;
            result.row = row;
            result[groupByColumns[0]] = row[groupByColumns[0]];
            groupNames.push(row.bucketObjectName);

            return result;
          }
        })
        .filter(value => value !== undefined);

      data.forEach(value => {
        const exists = [];
        groupNames.forEach(groupName => {
          exists.push(value.bucketObjectName.startsWith(groupName));
        });
        let evaluate = false;

        if (exists.length !== 0) {
          evaluate = exists.reduce((previousValue, currentValue) => previousValue || currentValue);
        }
        if (evaluate === false) {
          const result = new Group();
          result.level = level + 1;
          result.parent = parent;
          result[groupByColumns[0]] = 'Files';
          groups.push(result);
        }
      });
      groups = [...new Map(groups.map(item => [item.bucketObjectName, item])).values()];

    } else {
      groups = this.uniqueBy(
        data.map(
          (row, index) => {
            const result = new Group();
            result.level = level + 1;
            result.id = index;
            result.parent = parent;
            for (let i = 0; i <= level; i++) {
              result[groupByColumns[i]] = row[groupByColumns[i]];
            }

            return result;
          }
        ),
        JSON.stringify);
    }


    const currentColumn = groupByColumns[level];
    let subGroups = [];
    if (this.metadata.type !== 'Bucket') {
      for (let i = 0; i <= groups.length - 1; i++) {

        let rowsInGroup = [];
        if (i + 1 < groups.length) {
          rowsInGroup = data.filter(row => {
            return row[currentColumn].startsWith(groups[i][currentColumn]) &&
              !row[currentColumn].startsWith(groups[i + 1][currentColumn]);
          });
          rowsInGroup.forEach(value => value.parentId = groups[i].id);
        } else {
          rowsInGroup = data.filter(row => {
            return row[currentColumn].startsWith(groups[i][currentColumn]);
          });
          rowsInGroup.forEach(value => value.parentId = groups[i].id);
        }
        if (groups[i][currentColumn] === 'Files') {
          rowsInGroup = data.filter(row => {
            return !row[currentColumn].endsWith('/') && row.parentId === undefined;
          });
        }
        rowsInGroup = rowsInGroup.filter(value => value[currentColumn] !== groups[i][currentColumn]);
        rowsInGroup.unshift(groups[i]);
        subGroups = subGroups.concat(rowsInGroup);
      }
      return subGroups;
    } else {
      groups.forEach(group => {
        const rowsInGroup = data.filter(row => group[currentColumn] === row[currentColumn]);
        const subGroup = this.getSublevel(rowsInGroup, level + 1, groupByColumns, group);
        subGroup.unshift(group);
        subGroups = subGroups.concat(subGroup);
      });
      return subGroups;
    }
  }

  getDataRowVisible(data: any) {
    const groupRows = this.dataSource.data.filter(
      row => {
        if (!(row instanceof Group)) {
          return false;
        }

        let match = true;
        this.groupByColumns.forEach(
          column => {
            if (!row[column] || !data[column] || row[column] !== data[column]) {
              match = false;
            }
          }
        );
        return match;
      }
    );

    if (groupRows.length === 0) {
      return true;
    }
    if (groupRows.length > 1) {
      throw new Error('Data row is in more than one group!');
    }
    const parent = groupRows[0] as unknown as Group;

    return parent.visible && parent.expanded;
  }

  customFilterPredicate(data: any): boolean {
    return (data instanceof Group) ? data.visible : this.getDataRowVisible(data);
  }


  applyFilter(filterValue: string) {

    this.dataSourceFilter = filterValue;
    this.selectedRows = [];
    this.selection.clear();
    switch (filterValue) {
      case 'total':
        this.dataSource.data = this.unfilteredData.data;
        this.deleteButtonShow = true;
        this.acceptButtonShow = false;
        this.rejectButtonShow = false;
        break;
      case 'Approved':
        this.deleteButtonShow = true;
        this.acceptButtonShow = false;
        this.rejectButtonShow = false;
        this.dataSource.data = this.unfilteredData.data.filter(value => value.status === filterValue);
        break; // accepted
      case 'Rejected':
        this.dataSource.data = this.unfilteredData.data.filter(value => value.status === filterValue);
        this.deleteButtonShow = true;
        this.acceptButtonShow = false;
        this.rejectButtonShow = false;
        break; // rejected
      default:
        this.dataSource.data = this.addGroups(this.metadata.data.filter(value => value.status === filterValue), this.groupByColumns);
        this.deleteButtonShow = false;
        if (this.metadata.type === 'Bucket' || this.perspective === 'user') {
          this.acceptButtonShow = false;
          this.rejectButtonShow = false;
        } else {
          this.acceptButtonShow = true;
          this.rejectButtonShow = true;
        }

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
    if (this.isAllSelected()) {
      this.selection.clear();
      this.selectedRows = [];
    } else {
      this.dataSource.data.forEach(row => {
        this.selection.select(row as any);
        this.selectedRows.push(row as any);
      });
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  getDisplayedColumns(): string[] {
    if (this.dataSourceFilter === 'Approved' || this.dataSourceFilter === 'Rejected' || this.dataSourceFilter === 'total') {
      return this.metadata.displayedColumns
        .filter(col => col !== 'action');
    }
    if (this.perspective === 'user') {
      return this.metadata.displayedColumns.filter(col => col !== 'action');
    }
    return this.metadata.displayedColumns;
  }

  selectGroupChildren(event: MatCheckboxChange, group: any) {

    const children = this.dataSource.data.filter((value) => !(value instanceof Group) && value.parentId === group.id);
    this.selectedRows.push((this.metadata.type === 'Bucket') ? group as any : group.row as any);
    children.forEach(row => {
      this.selectedRows.push(row as any);
      // tslint:disable-next-line:max-line-length
      this.selection.isSelected(row as any) ? this.selection.deselect(row as any) : this.selection.select(row as any);
    });
  }

  acceptRequest(row) {

    const request = new Request();
    request.type = 'accept';
    request.content = [row];
    this.requestEmitter.emit(request);
  }

  rejectRequest(row) {
    const request = new Request();
    request.type = 'reject';
    request.content = [row];
    this.requestEmitter.emit(request);
  }

  emitSelectedRows(type: string) {
    if (this.selectedRows.length > 0) {
      const request = new Request();
      request.type = type;
      request.content = this.selectedRows;
      this.requestEmitter.emit(request);
    } else {
      this.toastr.warning('Please select Rows');
    }
  }

  addInSelectedFiles(event, row) {


    if (event.checked) {
      let exists = false;
      this.selectedRows.forEach(value => {
        if (value.bucketObjectName === row.bucketObjectName) {
          exists = true;
        }
      });
      if (exists === false) {

        this.selectedRows.push(row);
      }
    } else {

      this.selectedRows = this.selectedRows.filter(value => value.bucketObjectName !== row.bucketObjectName);
    }
  }
}





