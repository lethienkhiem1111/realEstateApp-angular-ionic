import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HousesPage } from './houses.page';

describe('HousesPage', () => {
  let component: HousesPage;
  let fixture: ComponentFixture<HousesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HousesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
