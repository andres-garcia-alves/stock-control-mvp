import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockActualizarComponent } from './stock-actualizar.component';

describe('StockActualizarComponent', () => {
  let component: StockActualizarComponent;
  let fixture: ComponentFixture<StockActualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockActualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockActualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
