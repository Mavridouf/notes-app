import { TestBed } from '@angular/core/testing';

import { UserSocketServiceService } from './user-socket-service.service';

describe('UserSocketServiceService', () => {
  let service: UserSocketServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSocketServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
