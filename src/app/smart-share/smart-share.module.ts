import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BucketListComponent } from './bucket-list/bucket-list.component';
import {RouterModule} from '@angular/router';
import { SideNavBarComponent } from './components/side-nav-bar/side-nav-bar.component';
import {
  MatButtonModule, MatCardModule,
  MatCheckboxModule, MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSidenavModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faBurn, faPlus, fas, faSearch, faTrashAlt, faUser, faUsers} from '@fortawesome/free-solid-svg-icons';
import {faBitbucket} from '@fortawesome/free-brands-svg-icons';
import { BucketComponent } from './bucket/bucket.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { AddUsersComponent } from './add-users/add-users.component';
import {DragDropModule} from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [BucketListComponent,  SideNavBarComponent, MenuBarComponent, BucketComponent,
    DashBoardComponent, DialogBoxComponent, AddUsersComponent],
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
    DragDropModule
  ],
  entryComponents: [DialogBoxComponent]
})
export class SmartShareModule {
  constructor() {
    library.add(fas);
    library.add(faSearch, faBurn, faBitbucket, faUsers, faTrashAlt, faPlus, faUser);
  }
}
