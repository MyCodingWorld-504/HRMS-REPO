import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDatabaseComponent } from './profile-database.component';

describe('ProfileDatabaseComponent', () => {
  let component: ProfileDatabaseComponent;
  let fixture: ComponentFixture<ProfileDatabaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileDatabaseComponent]
    });
    fixture = TestBed.createComponent(ProfileDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
