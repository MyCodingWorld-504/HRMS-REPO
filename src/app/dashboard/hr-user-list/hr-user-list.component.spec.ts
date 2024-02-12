import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrUserListComponent } from './hr-user-list.component';

describe('HrUserListComponent', () => {
  let component: HrUserListComponent;
  let fixture: ComponentFixture<HrUserListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HrUserListComponent]
    });
    fixture = TestBed.createComponent(HrUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
