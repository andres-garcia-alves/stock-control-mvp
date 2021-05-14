import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StockActualizarComponent } from './stock-actualizar.component';

describe('StockActualizarComponent', () => {
  let component: StockActualizarComponent;
  let fixture: ComponentFixture<StockActualizarComponent>;

  beforeEach(waitForAsync(() => {
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
