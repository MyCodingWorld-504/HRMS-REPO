import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmpProfilesComponent } from './edit-emp-profiles.component';

describe('EditEmpProfilesComponent', () => {
  let component: EditEmpProfilesComponent;
  let fixture: ComponentFixture<EditEmpProfilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditEmpProfilesComponent]
    });
    fixture = TestBed.createComponent(EditEmpProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
