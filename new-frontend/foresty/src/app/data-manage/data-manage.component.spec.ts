/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DataManageComponent } from './data-manage.component';

describe('DataManageComponent', () => {
  let component: DataManageComponent;
  let fixture: ComponentFixture<DataManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
