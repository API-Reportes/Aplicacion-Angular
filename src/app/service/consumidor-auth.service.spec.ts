import { TestBed } from '@angular/core/testing';

import { ConsumidorAuthService } from './consumidor-auth.service';

describe('ConsumidorAuthService', () => {
  let service: ConsumidorAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumidorAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
