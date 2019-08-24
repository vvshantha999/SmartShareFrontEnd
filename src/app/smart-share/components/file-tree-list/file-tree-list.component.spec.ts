import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FileTreeListComponent} from './file-tree-list.component';

describe('FileTreeListComponent', () => {
  let component: FileTreeListComponent;
  let fixture: ComponentFixture<FileTreeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FileTreeListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileTreeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
