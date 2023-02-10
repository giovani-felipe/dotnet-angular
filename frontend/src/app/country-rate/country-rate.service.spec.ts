import { TestBed } from '@angular/core/testing';

import { CountryRateService } from './country-rate.service';

describe('CountryRateService', () => {
  let service: CountryRateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryRateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
