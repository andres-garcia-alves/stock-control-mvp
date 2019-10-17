import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTransferirComponent } from './stock-transferir.component';

describe('StockTransferirComponent', () => {
  let component: StockTransferirComponent;
  let fixture: ComponentFixture<StockTransferirComponent>;

  beforeEach(async(() => {
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
