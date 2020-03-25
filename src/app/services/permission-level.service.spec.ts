import { TestBed } from '@angular/core/testing';

import { PermissionLevelService } from './permission-level.service';

describe('PermissionLevelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PermissionLevelService = TestBed.get(PermissionLevelService);
    expect(service).toBeTruthy();
  });
});
