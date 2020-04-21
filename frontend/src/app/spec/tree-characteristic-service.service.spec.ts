import { TestBed } from '@angular/core/testing';

import { TreeCharacteristicServiceService } from './tree-characteristic-service.service';

describe('TreeCharacteristicServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TreeCharacteristicServiceService = TestBed.get(TreeCharacteristicServiceService);
    expect(service).toBeTruthy();
  });
});
