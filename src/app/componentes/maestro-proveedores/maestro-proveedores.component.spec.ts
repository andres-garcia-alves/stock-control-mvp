import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MaestroProveedoresComponent } from './maestro-proveedores.component';

describe('MaestroProveedoresComponent', () => {
  let component: MaestroProveedoresComponent;
  let fixture: ComponentFixture<MaestroProveedoresComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MaestroProveedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
