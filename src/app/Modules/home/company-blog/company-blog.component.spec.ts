import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyBlogComponent } from './company-blog.component';

describe('CompanyBlogComponent', () => {
  let component: CompanyBlogComponent;
  let fixture: ComponentFixture<CompanyBlogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyBlogComponent]
    });
    fixture = TestBed.createComponent(CompanyBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
