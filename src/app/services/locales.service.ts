import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

import { BaseService } from './base.service';
import { ILocal } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalesService extends BaseService {

  /* this.locales = [
    { id: 1, direccion: '', nombre: 'Local CABA', numero_telefono: '', sucursula_id: 0 },
    { id: 2, direccion: '', nombre: 'Local Bs As', numero_telefono: '', sucursula_id: 0 },
    { id: 3, direccion: '', nombre: 'Local Rosario', numero_telefono: '', sucursula_id: 0 }
  ]; */

  private apiLocales: string;

  constructor(private http: HttpClient) {
    super();
    this.apiLocales = this.urlModuloStock + 'tiendas/';
  }

  async getLocales(): Promise<ILocal[]> {
    return this.http.get<ILocal[]>(this.apiLocales, this.buildRequestOptions())
      .pipe<ILocal[]>(catchError(this.errorHandler)).toPromise();
  }

  async getLocal(id: number): Promise<ILocal> {
    return this.http.get<ILocal>(this.apiLocales + id, this.buildRequestOptions())
      .pipe<ILocal>(catchError(this.errorHandler)).toPromise();
  }

  async postLocal(local: ILocal): Promise<ILocal> {
    return this.http.post<ILocal>(this.apiLocales, local, this.buildRequestOptions())
      .pipe<ILocal>(catchError(this.errorHandler)).toPromise();
  }

  async putLocal(local: ILocal) {
    return this.http.put<ILocal>(this.apiLocales + local.id, local, this.buildRequestOptions())
      .pipe<ILocal>(catchError(this.errorHandler)).toPromise();
  }

  async deleteLocal(id: number) {
    return this.http.delete(this.apiLocales + id, this.buildRequestOptions())
      .pipe(catchError(this.errorHandler)).toPromise();
  }
}
