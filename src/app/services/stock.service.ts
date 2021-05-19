import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

import { BaseService } from './base.service';
import { IStock } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class StockService extends BaseService {

  /*this.plainStock = [
    { id: 1, productoId: 1, productoNombre: 'Jeans Dama', localId: 1, localNombre: 'Local CABA', cantidad: 15 },
    { id: 2, productoId: 1, productoNombre: 'Jeans Dama', localId: 2, localNombre: 'Local Bs As', cantidad: 8 },
    { id: 3, productoId: 1, productoNombre: 'Jeans Dama', localId: 3, localNombre: 'Local Rosario', cantidad: 7 },
    { id: 4, productoId: 2, productoNombre: 'Jeans Caballero', localId: 1, localNombre: 'Local CABA', cantidad: 12 },
    { id: 5, productoId: 2, productoNombre: 'Jeans Caballero', localId: 2, localNombre: 'Local Bs As', cantidad: 6 },
    { id: 6, productoId: 2, productoNombre: 'Jeans Caballero', localId: 3, localNombre: 'Local Rosario', cantidad: 6 },
    { id: 7, productoId: 3, productoNombre: 'Camisa Dama', localId: 1, localNombre: 'Local CABA', cantidad: 16 },
    { id: 8, productoId: 3, productoNombre: 'Camisa Dama', localId: 2, localNombre: 'Local Bs As', cantidad: 10 },
    { id: 9, productoId: 3, productoNombre: 'Camisa Dama', localId: 3, localNombre: 'Local Rosario', cantidad: 11 }
  ];*/

  private apiStock: string;

  constructor(private http: HttpClient) {
    super();
    this.apiStock = this.urlModuloStock + 'stock/';
  }

  getStocks() {
    return this.http.get<IStock[]>(this.apiStock, this.buildRequestOptions());
  }

  postStock(stock: IStock): Observable<IStock> {
    return this.http.post<IStock>(this.apiStock, stock, this.buildRequestOptions())
      .pipe( catchError(this.errorHandler) );
  }

  putStock(stock: IStock) {
    return this.http.put<IStock>(this.apiStock + stock.id, stock, this.buildRequestOptions())
      .pipe( catchError(this.errorHandler) );
  }

  deleteStock(id: number) {
    return this.http.delete(this.apiStock + id, this.buildRequestOptions())
      .pipe( catchError(this.errorHandler) );
  }
}
