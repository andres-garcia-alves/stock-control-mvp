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

  async getVentas(): Promise<IVenta[]> {
    return this.http.get<IVenta[]>(this.apiVentas, this.buildRequestOptions())
      .pipe(catchError(this.errorHandler)).toPromise();
  }

  async getVenta(id: number): Promise<IVenta> {
    return this.http.get<IVenta>(this.apiVentas + id, this.buildRequestOptions())
      .pipe(catchError(this.errorHandler)).toPromise();
  }

  async postVenta(venta: IVenta): Promise<IVenta> {
    return this.http.post<IVenta>(this.apiVentas, venta, this.buildRequestOptions())
      .pipe(catchError(this.errorHandler)).toPromise();
  }

  async putVenta(id: number, venta: IVenta) {
    return this.http.put<IVenta>(this.apiVentas + id, venta, this.buildRequestOptions())
      .pipe(catchError(this.errorHandler)).toPromise();
  }

  async deleteVenta(id: number) {
    return this.http.delete(this.apiVentas + id, this.buildRequestOptions())
      .pipe(catchError(this.errorHandler)).toPromise();
  }
}
