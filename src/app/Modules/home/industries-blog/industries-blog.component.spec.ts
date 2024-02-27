import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustriesBlogComponent } from './industries-blog.component';

describe('IndustriesBlogComponent', () => {
  let component: IndustriesBlogComponent;
  let fixture: ComponentFixture<IndustriesBlogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndustriesBlogComponent]
    });
    fixture = TestBed.createComponent(IndustriesBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
