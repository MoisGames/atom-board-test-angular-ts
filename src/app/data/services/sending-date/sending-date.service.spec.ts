import { TestBed } from '@angular/core/testing';

import { SendingDateService } from './sending-date.service';

describe('SendingDateService', () => {
  let service: SendingDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendingDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
