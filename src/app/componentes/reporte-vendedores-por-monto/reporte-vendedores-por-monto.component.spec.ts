import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReporteVendedoresPorMontoComponent } from './reporte-vendedores-por-monto.component';

describe('ReporteVendedoresPorMontoComponent', () => {
  let component: ReporteVendedoresPorMontoComponent;
  let fixture: ComponentFixture<ReporteVendedoresPorMontoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteVendedoresPorMontoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteVendedoresPorMontoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
