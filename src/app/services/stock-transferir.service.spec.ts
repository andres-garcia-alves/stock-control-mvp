import { TestBed } from '@angular/core/testing';

import { StockTransferirService } from './stock-transferir.service';

describe('TransferirStockService', () => {
  let service: StockTransferirService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockTransferirService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
