import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasRegistrarComponent } from './ventas-registrar.component';

describe('VentasRegistrarComponent', () => {
  let component: VentasRegistrarComponent;
  let fixture: ComponentFixture<VentasRegistrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentasRegistrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
