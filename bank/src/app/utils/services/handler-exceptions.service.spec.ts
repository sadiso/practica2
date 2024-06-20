import { TestBed } from '@angular/core/testing';

import { HandlerExceptionsService } from './handler-exceptions.service';

describe('HandlerExceptionsService', () => {
  let service: HandlerExceptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandlerExceptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
