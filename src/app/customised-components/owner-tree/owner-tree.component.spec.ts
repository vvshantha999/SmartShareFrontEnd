import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OwnerTreeComponent} from './owner-tree.component';

describe('OwnerTreeComponent', () => {
  let component: OwnerTreeComponent;
  let fixture: ComponentFixture<OwnerTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerTreeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
