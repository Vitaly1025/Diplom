import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialPlotCardComponent } from './trial-plot-card.component';

describe('TrialPlotCardComponent', () => {
  let component: TrialPlotCardComponent;
  let fixture: ComponentFixture<TrialPlotCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrialPlotCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrialPlotCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
