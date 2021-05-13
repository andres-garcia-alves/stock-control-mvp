import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

import { ILogin, ILocal, IProducto, IProveedor, IUsuario } from '../interfaces/index';
import { IStock, IVenta, IBajaStock, ITransferirStock } from '../interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class AccesoDatosService {

  // urlBase = 'https://my-json-server.typicode.com/andres-garcia-alves/r2d2/'; // fake db
  // urlBase = 'https://envxilr8qlgd.x.pipedream.net/'; // echo server
  urlModuloStock = 'https://ingenieria2stock.herokuapp.com/stock/api/v1/';
  urlModuloUsers = 'https://ingenieria2stock.herokuapp.com/users/api/v1/';
  urlModuloLogin = 'https://ingenieria2stock.herokuapp.com/api-token-auth/';

  apiLogin = this.urlModuloLogin;
  apiUsuarios = this.urlModuloUsers + 'users/';

  apiLocales = this.urlModuloStock + 'tiendas/';
  apiProductos = this.urlModuloStock + 'productos/';
  apiProveedores = this.urlModuloStock + 'proveedores/';
  apiStock = this.urlModuloStock + 'stock/';
  apiVentas = this.urlModuloStock + 'ventas/';
  apiBajaStock = this.urlModuloStock + 'baja-stock/';
  apiTransferirStock = this.urlModuloStock + 'transferir-stock/';


  constructor(private http: HttpClient) { }

  postLogin(login: ILogin) {
    return this.http.post<any>(this.apiLogin, login)
    .pipe( catchError(this.handleError) );
  }

  putLogin(login: ILogin) {
    return this.http.put<any>(this.apiLogin, login, this.httpOptions())
      .pipe( catchError(this.handleError) );
  }


  getLocales() {
    return this.http.get<ILocal[]>(this.apiLocales, this.httpOptions());
  }

  getLocal(id: number): Observable<ILocal> {
    return this.http.get<ILocal>(this.apiLocales + id, this.httpOptions());
  }

  postLocal(local: ILocal): Observable<ILocal> {
    return this.http.post<ILocal>(this.apiLocales, local, this.httpOptions())
      .pipe( catchError(this.handleError) );
  }

  putLocal(local: ILocal) {
    return this.http.put<ILocal>(this.apiLocales + local.id, local, this.httpOptions())
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
    return this.http.put<IProducto>(this.apiProductos + producto.id, producto, this.httpOptions())
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
    return this.http.put<IProveedor>(this.apiProveedores + proveedor.id, proveedor, this.httpOptions())
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
    return this.http.put<IUsuario>(this.apiUsuarios + usuario.id, usuario, this.httpOptions())
      .pipe( catchError(this.handleError) );
  }

  deleteUsuario(id: number) {
    return this.http.delete(this.apiUsuarios + id, this.httpOptions())
      .pipe( catchError(this.handleError) );
  }


  getStocks() {
    return this.http.get<IStock[]>(this.apiStock, this.httpOptions());
  }

  postStock(stock: IStock): Observable<IStock> {
    return this.http.post<IStock>(this.apiStock, stock, this.httpOptions())
      .pipe( catchError(this.handleError) );
  }

  putStock(stock: IStock) {
    return this.http.put<IStock>(this.apiStock + stock.id, stock, this.httpOptions())
      .pipe( catchError(this.handleError) );
  }

  deleteStock(id: number) {
    return this.http.delete(this.apiStock + id, this.httpOptions())
      .pipe( catchError(this.handleError) );
  }


  getVentas() {
    return this.http.get<IVenta[]>(this.apiVentas, this.httpOptions());
  }

  getVenta(id: number) {
    return this.http.get<IVenta[]>(this.apiVentas + id, this.httpOptions());
  }

  postVenta(venta: IVenta): Observable<IVenta> {
    return this.http.post<IVenta>(this.apiVentas, venta, this.httpOptions())
      .pipe( catchError(this.handleError) );
  }

  putVenta(id: number, venta: IVenta) {
    return this.http.put<IVenta>(this.apiVentas + id, venta, this.httpOptions())
      .pipe( catchError(this.handleError) );
  }

  deleteVenta(id: number) {
    return this.http.delete(this.apiVentas + id, this.httpOptions())
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

  httpOptions(observeResponse: boolean = false) {
    const token = (sessionStorage.getItem('token') != null) ? sessionStorage.getItem('token') : '';

    if (observeResponse === false) {
      return {
        headers : new HttpHeaders({
          'Content-Type': 'application/json',
          // tslint:disable-next-line:object-literal-key-quotes
          'authorization': 'Token ' + token
        })
      };
    }

    if (observeResponse === true) {
      return {
        headers : new HttpHeaders({
          'Content-Type': 'application/json',
          // tslint:disable-next-line:object-literal-key-quotes
          'authorization': 'Token ' + token
        }),
        observe : 'response' as 'body'
      };
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Ocurrió un error: ', error.error.message);
    } else {
      console.error(`El back-end retornó el código ${error.status}`);
      console.error(`Descripción: ${error.message}.`);
    }
    return throwError('Fallo en el sistema; por favor intente más tarde.');
  }
}
