import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotelLeasesPage } from './motel-leases.page';

describe('MotelLeasesPage', () => {
  let component: MotelLeasesPage;
  let fixture: ComponentFixture<MotelLeasesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotelLeasesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotelLeasesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
