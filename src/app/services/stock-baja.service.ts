import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

import { BaseService } from './base.service';
import { IBajaStock } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class StockBajaService extends BaseService {

  /*this.plainStock = [
    { id: 1, productoId: 1, productoNombre: 'Jeans Dama', localId: 1, localNombre: 'Local CABA', cantidad: 15 },
    { id: 4, productoId: 2, productoNombre: 'Jeans Caballero', localId: 1, localNombre: 'Local CABA', cantidad: 12 },
    { id: 7, productoId: 3, productoNombre: 'Camisa Dama', localId: 1, localNombre: 'Local CABA', cantidad: 16 }
  ];*/

  private apiBajaStock: string;

  constructor(private http: HttpClient) {
    super();
    this.apiBajaStock = this.urlModuloStock + 'baja-stock/';
  }

  async postBajaStock(bajaStock: IBajaStock): Promise<IBajaStock> {
    return this.http.put<IBajaStock>(this.apiBajaStock, bajaStock, this.buildRequestOptions())
      .pipe(catchError(this.errorHandler)).toPromise();
  }
}
