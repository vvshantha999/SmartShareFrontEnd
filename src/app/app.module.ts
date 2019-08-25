import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthenticationModule} from './authentication/authentication.module';
import {RouterModule} from '@angular/router';
import {SmartShareModule} from './smart-share/smart-share.module';
import {FileTreeListComponent} from './src/app/smart-share/components/file-tree-list/file-tree-list.component';


@NgModule({
  declarations: [
    AppComponent,
    FileTreeListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    AuthenticationModule,
    SmartShareModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
