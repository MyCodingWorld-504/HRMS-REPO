import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationLayoutComponent } from './administration-layout.component';

describe('AdministrationLayoutComponent', () => {
  let component: AdministrationLayoutComponent;
  let fixture: ComponentFixture<AdministrationLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrationLayoutComponent]
    });
    fixture = TestBed.createComponent(AdministrationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
