import { TestBed } from '@angular/core/testing';

import { NotesSocketServiceService } from './notes-socket-service.service';

describe('NotesSocketServiceService', () => {
  let service: NotesSocketServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotesSocketServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
