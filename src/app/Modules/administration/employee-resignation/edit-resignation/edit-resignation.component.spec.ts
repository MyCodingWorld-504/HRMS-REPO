import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditResignationComponent } from './edit-resignation.component';

describe('EditResignationComponent', () => {
  let component: EditResignationComponent;
  let fixture: ComponentFixture<EditResignationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditResignationComponent]
    });
    fixture = TestBed.createComponent(EditResignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
