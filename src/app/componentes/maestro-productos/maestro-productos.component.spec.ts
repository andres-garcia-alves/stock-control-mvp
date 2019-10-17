import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestroProductosComponent } from './maestro-productos.component';

describe('MaestroProductosComponent', () => {
  let component: MaestroProductosComponent;
  let fixture: ComponentFixture<MaestroProductosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaestroProductosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
