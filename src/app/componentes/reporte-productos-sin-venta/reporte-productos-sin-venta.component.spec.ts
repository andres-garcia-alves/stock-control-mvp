import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteProductosSinVentaComponent } from './reporte-productos-sin-venta.component';

describe('ReporteProductosSinVentaComponent', () => {
  let component: ReporteProductosSinVentaComponent;
  let fixture: ComponentFixture<ReporteProductosSinVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteProductosSinVentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteProductosSinVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
