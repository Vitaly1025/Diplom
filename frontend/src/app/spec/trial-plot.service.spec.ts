import { TestBed } from '@angular/core/testing';

import { TrialPlotService } from './trial-plot.service';

describe('TrialPlotService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrialPlotService = TestBed.get(TrialPlotService);
    expect(service).toBeTruthy();
  });
});
