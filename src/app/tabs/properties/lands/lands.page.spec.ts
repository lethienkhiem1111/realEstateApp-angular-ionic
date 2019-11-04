import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandsPage } from './lands.page';

describe('LandsPage', () => {
  let component: LandsPage;
  let fixture: ComponentFixture<LandsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
