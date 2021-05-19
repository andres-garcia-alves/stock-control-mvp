import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

import { BaseService } from './base.service';
import { IVenta } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class VentasService extends BaseService {

  private apiVentas: string;

  constructor(private http: HttpClient) {
    super();
    this.apiVentas = this.urlModuloStock + 'ventas/';
  }

  getVentas() {
    return this.http.get<IVenta[]>(this.apiVentas, this.buildRequestOptions());
  }

  getVenta(id: number) {
    return this.http.get<IVenta[]>(this.apiVentas + id, this.buildRequestOptions());
  }

  postVenta(venta: IVenta): Observable<IVenta> {
    return this.http.post<IVenta>(this.apiVentas, venta, this.buildRequestOptions())
      .pipe( catchError(this.errorHandler) );
  }

  putVenta(id: number, venta: IVenta) {
    return this.http.put<IVenta>(this.apiVentas + id, venta, this.buildRequestOptions())
      .pipe( catchError(this.errorHandler) );
  }

  deleteVenta(id: number) {
    return this.http.delete(this.apiVentas + id, this.buildRequestOptions())
      .pipe( catchError(this.errorHandler) );
  }
}
