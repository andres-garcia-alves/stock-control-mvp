import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportePromocionesComponent } from './reporte-promociones.component';

describe('ReportePromocionesComponent', () => {
  let component: ReportePromocionesComponent;
  let fixture: ComponentFixture<ReportePromocionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportePromocionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportePromocionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
