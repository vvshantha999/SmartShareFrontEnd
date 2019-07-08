import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BucketListComponent } from './bucket-list/bucket-list.component';
import {RouterModule} from '@angular/router';
import { SideNavBarComponent } from './components/side-nav-bar/side-nav-bar.component';
import {MatButtonModule, MatCheckboxModule, MatSidenavModule} from '@angular/material';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [BucketListComponent,  SideNavBarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'buckets', component: BucketListComponent},
      {path: '', redirectTo: '/buckets', pathMatch: 'full'}
    ]),
    MatSidenavModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
  ]
})
export class SmartShareModule { }
