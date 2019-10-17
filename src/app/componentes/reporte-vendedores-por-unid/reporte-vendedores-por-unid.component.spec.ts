import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteVendedoresPorUnidComponent } from './reporte-vendedores-por-unid.component';

describe('ReporteVendedoresPorUnidComponent', () => {
  let component: ReporteVendedoresPorUnidComponent;
  let fixture: ComponentFixture<ReporteVendedoresPorUnidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteVendedoresPorUnidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteVendedoresPorUnidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
