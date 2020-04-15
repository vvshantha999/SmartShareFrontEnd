import {TestBed} from '@angular/core/testing';

import {BucketObjectResolver} from './bucket-object-resolver.service';

describe('BucketObjectResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BucketObjectResolver = TestBed.get(BucketObjectResolver);
    expect(service).toBeTruthy();
  });
});
