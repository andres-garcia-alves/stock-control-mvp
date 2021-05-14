import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReporteVendedoresPorUnidComponent } from './reporte-vendedores-por-unid.component';

describe('ReporteVendedoresPorUnidComponent', () => {
  let component: ReporteVendedoresPorUnidComponent;
  let fixture: ComponentFixture<ReporteVendedoresPorUnidComponent>;

  beforeEach(waitForAsync(() => {
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
