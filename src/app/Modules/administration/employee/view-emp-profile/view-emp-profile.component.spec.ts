import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmpProfileComponent } from './view-emp-profile.component';

describe('ViewEmpProfileComponent', () => {
  let component: ViewEmpProfileComponent;
  let fixture: ComponentFixture<ViewEmpProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewEmpProfileComponent]
    });
    fixture = TestBed.createComponent(ViewEmpProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
