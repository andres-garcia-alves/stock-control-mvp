import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteVendedoresPorMontoComponent } from './reporte-vendedores-por-monto.component';

describe('ReporteVendedoresPorMontoComponent', () => {
  let component: ReporteVendedoresPorMontoComponent;
  let fixture: ComponentFixture<ReporteVendedoresPorMontoComponent>;

  beforeEach(async(() => {
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
