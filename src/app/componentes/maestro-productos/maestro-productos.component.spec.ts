import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MaestroProductosComponent } from './maestro-productos.component';

describe('MaestroProductosComponent', () => {
  let component: MaestroProductosComponent;
  let fixture: ComponentFixture<MaestroProductosComponent>;

  beforeEach(waitForAsync(() => {
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
