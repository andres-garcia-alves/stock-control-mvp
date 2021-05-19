import { TestBed } from '@angular/core/testing';

import { StockBajaService } from './stock-baja.service';

describe('StockBajaService', () => {
  let service: StockBajaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockBajaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
