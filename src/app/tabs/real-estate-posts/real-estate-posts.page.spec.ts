import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstatePostsPage } from './real-estate-posts.page';

describe('RealEstatePostsPage', () => {
  let component: RealEstatePostsPage;
  let fixture: ComponentFixture<RealEstatePostsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealEstatePostsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealEstatePostsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
