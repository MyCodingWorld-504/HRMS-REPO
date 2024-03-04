import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeletePopupComponent } from './confirm-delete-popup.component';

describe('ConfirmDeletePopupComponent', () => {
  let component: ConfirmDeletePopupComponent;
  let fixture: ComponentFixture<ConfirmDeletePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDeletePopupComponent]
    });
    fixture = TestBed.createComponent(ConfirmDeletePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
