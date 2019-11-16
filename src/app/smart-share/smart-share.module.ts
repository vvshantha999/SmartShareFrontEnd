import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomisedComponentsModule} from '../customised-components/customised-components.module';
import {RouterModule} from '@angular/router';
import {BucketListComponent} from './bucket-list/bucket-list.component';
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
import {AddUsersComponent} from './add-users/add-users.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {UsersListComponent} from './users-list/users-list.component';
import {UserComponent} from './user/user.component';
import {AdministrationComponent} from './administration/administration.component';
import {BucketManagementComponent} from './administration/bucket-management/bucket-management.component';
import {FileAndFolderManagementComponent} from './administration/file-and-folder-management/file-and-folder-management.component';
import {FileExplorerComponent} from './file-explorer/file-explorer.component';
import {DialogBoxComponent} from '../customised-components/dialog-box/dialog-box.component';
import {
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatListModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatTooltipModule
} from '@angular/material';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptorService} from '../authentication/auth-interceptor.service';
import {RelationshipComponent} from './relationship/relationship.component';


@NgModule({
  declarations: [
    BucketListComponent,
    BucketComponent,
    DashBoardComponent,
    AddUsersComponent,
    UsersListComponent,
    UserComponent,
    AdministrationComponent,
    BucketManagementComponent,
    FileAndFolderManagementComponent,
    FileExplorerComponent,
    RelationshipComponent],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  imports: [
    CommonModule,
    CustomisedComponentsModule,
    HttpClientModule,
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
            path: 'relationships',
            component: RelationshipComponent
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
    DragDropModule,
    MatTooltipModule,
    MatExpansionModule,
    MatDividerModule,
    MatTabsModule,
    MatListModule,
    MatSlideToggleModule,
    MatDialogModule,
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

