import { TestBed } from '@angular/core/testing';

import { GlobalsrvService } from './globalsrv.service';

describe('GlobalsrvService', () => {
  let service: GlobalsrvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalsrvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
