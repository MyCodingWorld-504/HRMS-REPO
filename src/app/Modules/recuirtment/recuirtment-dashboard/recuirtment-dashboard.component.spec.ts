import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuirtmentDashboardComponent } from './recuirtment-dashboard.component';

describe('RecuirtmentDashboardComponent', () => {
  let component: RecuirtmentDashboardComponent;
  let fixture: ComponentFixture<RecuirtmentDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecuirtmentDashboardComponent]
    });
    fixture = TestBed.createComponent(RecuirtmentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
