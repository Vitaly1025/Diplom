/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TrialplotComponent } from './trialplot.component';

describe('TrialplotComponent', () => {
  let component: TrialplotComponent;
  let fixture: ComponentFixture<TrialplotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrialplotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrialplotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
