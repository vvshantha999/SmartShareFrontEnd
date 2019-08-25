import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BucketListComponent} from './bucket-list/bucket-list.component';
import {RouterModule} from '@angular/router';
import {SideNavBarComponent} from './components/side-nav-bar/side-nav-bar.component';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {MenuBarComponent} from './components/menu-bar/menu-bar.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faBurn,
  faCloudDownloadAlt,
  faCloudUploadAlt,
  faEye,
  faFileAlt,
  faFileArchive,
  faFolderPlus,
  faPlus,
  fas,
  faSearch,
  faTimes,
  faTrashAlt,
  faUser,
  faUserCog,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import {faBitbucket, faWpexplorer} from '@fortawesome/free-brands-svg-icons';
import {BucketComponent} from './bucket/bucket.component';
import {DashBoardComponent} from './dash-board/dash-board.component';
import {DialogBoxComponent} from './components/dialog-box/dialog-box.component';
import {AddUsersComponent} from './add-users/add-users.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {UsersListComponent} from './users-list/users-list.component';
import {UserComponent} from './user/user.component';
import {CollapsableCardComponent} from './components/collapsable-card/collapsable-card.component';
import {AdminComponent} from './components/admin/admin.component';
import {AdministrationComponent} from './administration/administration.component';
import {BucketManagementComponent} from './administration/bucket-management/bucket-management.component';
import {FileAndFolderManagementComponent} from './administration/file-and-folder-management/file-and-folder-management.component';
import {FlowerChartComponent} from './components/flower-chart/flower-chart.component';
import {FileExplorerComponent} from './file-explorer/file-explorer.component';
import {FileTreeListComponent} from './components/file-tree-list/file-tree-list.component';


@NgModule({
  declarations: [BucketListComponent,  SideNavBarComponent, MenuBarComponent, BucketComponent,
    DashBoardComponent, DialogBoxComponent, AddUsersComponent, UsersListComponent, UserComponent,
    CollapsableCardComponent, AdminComponent, AdministrationComponent, BucketManagementComponent,
    FileAndFolderManagementComponent, FlowerChartComponent, FileExplorerComponent, FileTreeListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'dashboard',
        component: DashBoardComponent,
        children: [
          {path: '', redirectTo: 'buckets', pathMatch: 'full'},
          {path: 'buckets', component: BucketListComponent},
          {
            path: 'addUsers',
            component: AddUsersComponent,
            data: {bucketName: ''}
          },
          {path: 'users', component: UsersListComponent},
          {
            path: 'explorer',
            component: FileExplorerComponent,
            data: {bucketName: ''}
          },
          {
            path: 'administration',
            component: AdministrationComponent,
            children: [
              {path: '', redirectTo: 'bucket', pathMatch: 'full'},
              {path: 'bucket', component: BucketManagementComponent, data: {filter: ''}},
              {path: 'bucket', component: BucketManagementComponent},
              {path: 'filesOrFolders', component: FileAndFolderManagementComponent}
            ]
          }
        ]
      }
    ]),
    MatSidenavModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FontAwesomeModule,
    MatCardModule,
    MatDialogModule,
    MatTooltipModule,
    DragDropModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatListModule,
    MatTabsModule
  ],
  entryComponents: [DialogBoxComponent]
})
export class SmartShareModule {
  constructor() {
    library.add(fas);
    library.add(faSearch, faBurn, faBitbucket, faUsers, faTrashAlt, faTimes,
      faPlus, faUser, faUserCog, faFileArchive, faEye, faWpexplorer, faFolderPlus, faCloudDownloadAlt, faCloudUploadAlt, faFileAlt);
  }
}
