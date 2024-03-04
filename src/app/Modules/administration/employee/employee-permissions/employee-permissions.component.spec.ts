import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePermissionsComponent } from './employee-permissions.component';

describe('EmployeePermissionsComponent', () => {
  let component: EmployeePermissionsComponent;
  let fixture: ComponentFixture<EmployeePermissionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeePermissionsComponent]
    });
    fixture = TestBed.createComponent(EmployeePermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
