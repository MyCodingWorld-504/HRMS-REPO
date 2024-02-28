import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBankDetailsComponent } from './edit-bank-details.component';

describe('EditBankDetailsComponent', () => {
  let component: EditBankDetailsComponent;
  let fixture: ComponentFixture<EditBankDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBankDetailsComponent]
    });
    fixture = TestBed.createComponent(EditBankDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
