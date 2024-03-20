import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedLeavesComponent } from './applied-leaves.component';

describe('AppliedLeavesComponent', () => {
  let component: AppliedLeavesComponent;
  let fixture: ComponentFixture<AppliedLeavesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppliedLeavesComponent]
    });
    fixture = TestBed.createComponent(AppliedLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
