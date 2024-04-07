import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractiveDemoComponent } from './interactive-demo.component';

describe('InteractiveDemoComponent', () => {
  let component: InteractiveDemoComponent;
  let fixture: ComponentFixture<InteractiveDemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InteractiveDemoComponent]
    });
    fixture = TestBed.createComponent(InteractiveDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
