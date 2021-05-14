import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StockTransferirComponent } from './stock-transferir.component';

describe('StockTransferirComponent', () => {
  let component: StockTransferirComponent;
  let fixture: ComponentFixture<StockTransferirComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StockTransferirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTransferirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
