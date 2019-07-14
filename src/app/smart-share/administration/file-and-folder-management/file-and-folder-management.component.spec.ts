import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileAndFolderManagementComponent } from './file-and-folder-management.component';

describe('FileAndFolderManagementComponent', () => {
  let component: FileAndFolderManagementComponent;
  let fixture: ComponentFixture<FileAndFolderManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileAndFolderManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileAndFolderManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
