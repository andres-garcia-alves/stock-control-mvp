import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReporteProductosSinVentaComponent } from './reporte-productos-sin-venta.component';

describe('ReporteProductosSinVentaComponent', () => {
  let component: ReporteProductosSinVentaComponent;
  let fixture: ComponentFixture<ReporteProductosSinVentaComponent>;

  beforeEach(waitForAsync(() => {
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
