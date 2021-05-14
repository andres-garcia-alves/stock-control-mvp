import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportePromocionesComponent } from './reporte-promociones.component';

describe('ReportePromocionesComponent', () => {
  let component: ReportePromocionesComponent;
  let fixture: ComponentFixture<ReportePromocionesComponent>;

  beforeEach(waitForAsync(() => {
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
