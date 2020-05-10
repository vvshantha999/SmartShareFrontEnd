import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateBucketDialogComponent} from './create-bucket-dialog.component';

describe('CreateBucketDialogComponent', () => {
  let component: CreateBucketDialogComponent;
  let fixture: ComponentFixture<CreateBucketDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBucketDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBucketDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
