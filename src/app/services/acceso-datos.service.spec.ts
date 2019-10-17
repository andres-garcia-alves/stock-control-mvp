import { TestBed } from '@angular/core/testing';

import { AccesoDatosService } from './acceso-datos.service';

describe('AccesoDatosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccesoDatosService = TestBed.get(AccesoDatosService);
    expect(service).toBeTruthy();
  });
});
