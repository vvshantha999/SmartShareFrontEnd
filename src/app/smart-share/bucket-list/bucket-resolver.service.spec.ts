import {TestBed} from '@angular/core/testing';

import {BucketResolverService} from './bucket-resolver.service';

describe('BucketResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BucketResolverService = TestBed.get(BucketResolverService);
    expect(service).toBeTruthy();
  });
});
