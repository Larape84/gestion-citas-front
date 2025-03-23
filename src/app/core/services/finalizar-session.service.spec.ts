import { TestBed } from '@angular/core/testing';

import { FinalizarSessionService } from './finalizar-session.service';

describe('FinalizarSessionService', () => {
  let service: FinalizarSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinalizarSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
