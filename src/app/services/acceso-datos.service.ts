import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

import { ILogin, ILocal, IProducto, IProveedor, IUsuario } from '../interfaces/index';
import { IStock, IBajaStock, ITransferirStock } from '../interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class AccesoDatosService {

  // TODO: update con URL del back-end real
  urlBase = 'https://envxilr8qlgd.x.pipedream.net/'; // echo
  // urlBase = 'https://my-json-server.typicode.com/andres-garcia-alves/r2d2/'; // fake db

  apiLogin = this.urlBase + 'login/';
  apiLocales = this.urlBase + 'locales/';
  apiProductos = this.urlBase + 'productos/';
  apiProveedores = this.urlBase + 'proveedores/';
  apiUsuarios = this.urlBase + 'usuarios/';

  apiStock = this.urlBase + 'stock/';
  apiBajaStock = this.urlBase + 'baja-stock/';
  apiTransferirStock = this.urlBase + 'transferir-stock/';

  constructor(private http: HttpClient) { }

  postLogin(login: ILogin) {
    return this.http.post<string>(this.apiLogin, login, this.httpOptions())
    .pipe( catchError(this.handleError) );
  }

  putLogin(login: ILogin) {
    return this.http.put<ILogin>(this.apiLogin, login, this.httpOptions())
      .pipe( catchError(this.handleError) );
  }


  getLocales() {
    return this.http.get<ILocal[]>(this.apiLocales, this.httpOptions());
  }

  getLocal(id: number) {
    return this.http.get<ILocal>(this.apiLocales + id, this.httpOptions());
  }

  postLocal(local: ILocal): Observable<number> {
    return this.http.post<number>(this.apiLocales, local, this.httpOptions())
      .pipe( catchError(this.handleError) );
  }

  putLocal(local: ILocal) {
    return this.http.put<ILocal>(this.apiLocales, local, this.httpOptions())
      .pipe( catchError(this.handleError) );
  }

  deleteLocal(id: number) {
    return this.http.delete(this.apiLocales + id, this.httpOptions())
      .pipe( catchError(this.handleError) );
  }


  getProductos() {
    return this.http.get<IProducto[]>(this.apiProductos, this.httpOptions());
  }

  getProducto(id: number) {
    return this.http.get<IProducto>(this.apiProductos + id, this.httpOptions());
  }

  postProducto(producto: IProducto): Observable<IProducto> {
    return this.http.post<IProducto>(this.apiProductos, producto, this.httpOptions())
      .pipe( catchError(this.handleError) );
  }

  putProducto(producto: IProducto) {
    return this.http.put<IProducto>(this.apiProductos, producto, this.httpOptions())
      .pipe( catchError(this.handleError) );
  }

  deleteProducto(id: number) {
    return this.http.delete(this.apiProductos + id, this.httpOptions())
      .pipe( catchError(this.handleError) );
  }


  getProveedores() {
    return this.http.get<IProveedor[]>(this.apiProveedores, this.httpOptions());
  }

  getProveedor(id: number) {
    return this.http.get<IProveedor>(this.apiProveedores + id, this.httpOptions());
  }

  postProveedor(proveedor: IProveedor): Observable<IProveedor> {
    return this.http.post<IProveedor>(this.apiProveedores, proveedor, this.httpOptions())
      .pipe( catchError(this.handleError) );
  }

  putProveedor(proveedor: IProveedor) {
    return this.http.put<IProveedor>(this.apiProveedores, proveedor, this.httpOptions())
      .pipe( catchError(this.handleError) );
  }

  deleteProveedor(id: number) {
    return this.http.delete(this.apiProveedores + id, this.httpOptions())
      .pipe( catchError(this.handleError) );
  }


  getUsuarios() {
    return this.http.get<IUsuario[]>(this.apiUsuarios, this.httpOptions());
  }

  getUsuario(id: number) {
    return this.http.get<IUsuario>(this.apiUsuarios + id, this.httpOptions());
  }

  postUsuario(usuario: IUsuario): Observable<IUsuario> {
    return this.http.post<IUsuario>(this.apiUsuarios, usuario, this.httpOptions())
      .pipe( catchError(this.handleError) );
  }

  putUsuario(usuario: IUsuario) {
    return this.http.put<IUsuario>(this.apiUsuarios, usuario, this.httpOptions())
      .pipe( catchError(this.handleError) );
  }

  deleteUsuario(id: number) {
    return this.http.delete(this.apiUsuarios + id, this.httpOptions())
      .pipe( catchError(this.handleError) );
  }


  getStock() {
    return this.http.get<IStock[]>(this.apiStock, this.httpOptions());
  }

  postStock(stock: IStock): Observable<IStock> {
    return this.http.post<IStock>(this.apiStock, stock, this.httpOptions())
      .pipe( catchError(this.handleError) );
  }

  putStock(stock: IStock) {
    return this.http.put<IStock>(this.apiStock, stock, this.httpOptions())
      .pipe( catchError(this.handleError) );
  }

  deleteStock(id: number) {
    return this.http.delete(this.apiStock + id, this.httpOptions())
      .pipe( catchError(this.handleError) );
  }


  postBajaStock(bajaStock: IBajaStock) {
    return this.http.put<IBajaStock>(this.apiBajaStock, bajaStock, this.httpOptions())
      .pipe( catchError(this.handleError) );
  }


  postTransferirStock(transferirStock: ITransferirStock) {
    return this.http.put<ITransferirStock>(this.apiTransferirStock, transferirStock, this.httpOptions())
      .pipe( catchError(this.handleError) );
  }


  httpOptions() {
    const token = (sessionStorage.getItem('token') != null) ? sessionStorage.getItem('token') : '';

    return {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        // tslint:disable-next-line:object-literal-key-quotes
        'Authorization': token
      }),
      observe : 'response' as 'body'
    };
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Ocurrió un error: ', error.error.message);
    } else {
      console.error(`El backend retornó el código ${error.status}, Descripción: ${error.message}.`);
    }
    return throwError('Fallo en el sistema; por favor intente más tarde.');
  }
}
