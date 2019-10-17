import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestroLocalesComponent } from './maestro-locales.component';

describe('MaestroLocalesComponent', () => {
  let component: MaestroLocalesComponent;
  let fixture: ComponentFixture<MaestroLocalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaestroLocalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroLocalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
