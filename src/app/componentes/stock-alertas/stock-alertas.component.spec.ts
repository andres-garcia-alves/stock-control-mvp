import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StockAlertasComponent } from './stock-alertas.component';

describe('StockAlertasComponent', () => {
  let component: StockAlertasComponent;
  let fixture: ComponentFixture<StockAlertasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StockAlertasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockAlertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
