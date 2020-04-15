import {TestBed} from '@angular/core/testing';

import {AdminServerService} from './admin-server.service';

describe('AdminServerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminServerService = TestBed.get(AdminServerService);
    expect(service).toBeTruthy();
  });
});
