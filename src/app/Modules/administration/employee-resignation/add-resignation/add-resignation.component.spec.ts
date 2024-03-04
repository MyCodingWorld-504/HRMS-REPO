import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResignationComponent } from './add-resignation.component';

describe('AddResignationComponent', () => {
  let component: AddResignationComponent;
  let fixture: ComponentFixture<AddResignationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddResignationComponent]
    });
    fixture = TestBed.createComponent(AddResignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
