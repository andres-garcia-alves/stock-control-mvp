import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockBajaComponent } from './stock-baja.component';

describe('StockBajaComponent', () => {
  let component: StockBajaComponent;
  let fixture: ComponentFixture<StockBajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockBajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
