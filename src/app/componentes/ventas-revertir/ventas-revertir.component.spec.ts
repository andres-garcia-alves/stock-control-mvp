import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VentasRevertirComponent } from './ventas-revertir.component';

describe('VentasRevertirComponent', () => {
  let component: VentasRevertirComponent;
  let fixture: ComponentFixture<VentasRevertirComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VentasRevertirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasRevertirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
