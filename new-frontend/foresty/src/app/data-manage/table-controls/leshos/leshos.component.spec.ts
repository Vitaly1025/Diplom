/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LeshosComponent } from './leshos.component';

describe('LeshosComponent', () => {
  let component: LeshosComponent;
  let fixture: ComponentFixture<LeshosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeshosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeshosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
