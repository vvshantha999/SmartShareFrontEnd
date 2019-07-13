import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsableCardComponent } from './collapsable-card.component';

describe('CollapsableCardComponent', () => {
  let component: CollapsableCardComponent;
  let fixture: ComponentFixture<CollapsableCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollapsableCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapsableCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
