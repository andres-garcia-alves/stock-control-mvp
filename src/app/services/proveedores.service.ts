import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

import { BaseService } from './base.service';
import { IProveedor } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService extends BaseService {

  /*this.proveedores = [
    { id: 1, direccion: '', nombre: 'Levis', numero_telefono: '' },
    { id: 2, direccion: '', nombre: 'Wrangler', numero_telefono: '' },
    { id: 3, direccion: '', nombre: '42 Street', numero_telefono: '' },
    { id: 4, direccion: '', nombre: 'Chocolate', numero_telefono: '' },
    { id: 5, direccion: '', nombre: 'Akiabara', numero_telefono: '' },
    { id: 6, direccion: '', nombre: 'Solido', numero_telefono: '' }
  ];*/

  private apiProveedores: string;

  constructor(private http: HttpClient) {
    super();
    this.apiProveedores = this.urlModuloStock + 'proveedores/';
  }

  async getProveedores(): Promise<IProveedor[]>  {
    return this.http.get<IProveedor[]>(this.apiProveedores, this.buildRequestOptions())
      .pipe(catchError(this.errorHandler)).toPromise();
  }

  async getProveedor(id: number): Promise<IProveedor> {
    return this.http.get<IProveedor>(this.apiProveedores + id, this.buildRequestOptions())
      .pipe(catchError(this.errorHandler)).toPromise();
  }

  async postProveedor(proveedor: IProveedor): Promise<IProveedor> {
    return this.http.post<IProveedor>(this.apiProveedores, proveedor, this.buildRequestOptions())
      .pipe(catchError(this.errorHandler)).toPromise();
  }

  async putProveedor(proveedor: IProveedor) {
    return this.http.put<IProveedor>(this.apiProveedores + proveedor.id, proveedor, this.buildRequestOptions())
      .pipe(catchError(this.errorHandler)).toPromise();
  }

  async deleteProveedor(id: number) {
    return this.http.delete(this.apiProveedores + id, this.buildRequestOptions())
      .pipe(catchError(this.errorHandler)).toPromise();
  }
}
