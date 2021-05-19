import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

import { BaseService } from './base.service';
import { IProducto } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductosService extends BaseService {

  /*this.productos = [
    { id: 1, codigo_barra: '', nombre: 'Jeans Dama', descripcion: '', precio: 3500 },
    { id: 2, codigo_barra: '', nombre: 'Jeans Caballero', descripcion: '', precio: 3600 },
    { id: 3, codigo_barra: '', nombre: 'Camisa Dama', descripcion: '', precio: 1700 },
    { id: 4, codigo_barra: '', nombre: 'Camisa Caballero', descripcion: '', precio: 1800 },
    { id: 5, codigo_barra: '', nombre: 'Remera Dama', descripcion: '', precio: 1000 },
    { id: 6, codigo_barra: '', nombre: 'Remera Caballero', descripcion: '', precio: 1200 }
  ];*/

  private apiProductos: string;

  constructor(private http: HttpClient) {
    super();
    this.apiProductos = this.urlModuloStock + 'productos/';
  }

  async getProductos(): Promise<IProducto[]> {
    return this.http.get<IProducto[]>(this.apiProductos, this.buildRequestOptions())
      .pipe(catchError(this.errorHandler)).toPromise();
  }

  async getProducto(id: number): Promise<IProducto> {
    return this.http.get<IProducto>(this.apiProductos + id, this.buildRequestOptions())
      .pipe(catchError(this.errorHandler)).toPromise();
  }

  async postProducto(producto: IProducto): Promise<IProducto> {
    return this.http.post<IProducto>(this.apiProductos, producto, this.buildRequestOptions())
      .pipe(catchError(this.errorHandler)).toPromise();
  }

  async putProducto(producto: IProducto) {
    return this.http.put<IProducto>(this.apiProductos + producto.id, producto, this.buildRequestOptions())
      .pipe(catchError(this.errorHandler)).toPromise();;
  }

  async deleteProducto(id: number) {
    return this.http.delete(this.apiProductos + id, this.buildRequestOptions())
      .pipe(catchError(this.errorHandler)).toPromise();;
  }
}
