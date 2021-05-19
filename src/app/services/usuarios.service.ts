import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

import { BaseService } from './base.service';
import { IUsuario } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService extends BaseService {

  /*this.usuarios = [
    { id: 1, username: 'Bonomini, Guido', first_name: 'Guido', last_name: 'Bonomini', email: 'abc@gmail.com',
      is_active: true, date_joined: Date.now(), last_login: Date.now() },
    { id: 2, username: 'Debole, Nancy', first_name: 'Nancy', last_name: 'Debole', email: 'abc@gmail.com',
      is_active: true, date_joined: Date.now(), last_login: Date.now() },
    { id: 3, username: 'Garcia Alves, Andrés', first_name: 'Andrés', last_name: 'Garcia Alves', email: 'abc@gmail.com',
      is_active: true, date_joined: Date.now(), last_login: Date.now() },
    { id: 4, username: 'Salvarrey, Ignacio', first_name: 'Ignacio', last_name: 'Salvarrey', email: 'abc@gmail.com',
      is_active: true, date_joined: Date.now(), last_login: Date.now() },
    { id: 5, username: 'Tanaro, Maria', first_name: 'Maria', last_name: 'Tanaro', email: 'abc@gmail.com',
      is_active: true, date_joined: Date.now(), last_login: Date.now() },
    { id: 6, username: 'Turreiro Manzini, Ignacio', first_name: 'Ignacio', last_name: 'Turreiro Manzini', email: 'abc@gmail.com',
      is_active: true, date_joined: Date.now(), last_login: Date.now() },
  ];*/

  private apiUsuarios: string;

  constructor(private http: HttpClient) {
    super();
    this.apiUsuarios = this.urlModuloUsers + 'users/';
  }

  async getUsuarios(): Promise<IUsuario[]> {
    return this.http.get<IUsuario[]>(this.apiUsuarios, this.buildRequestOptions())
      .pipe(catchError(this.errorHandler)).toPromise();
  }

  async getUsuario(id: number): Promise<IUsuario> {
    return this.http.get<IUsuario>(this.apiUsuarios + id, this.buildRequestOptions())
      .pipe(catchError(this.errorHandler)).toPromise();
  }

  async postUsuario(usuario: IUsuario): Promise<IUsuario> {
    return this.http.post<IUsuario>(this.apiUsuarios, usuario, this.buildRequestOptions())
      .pipe(catchError(this.errorHandler)).toPromise();
  }

  async putUsuario(usuario: IUsuario) {
    return this.http.put<IUsuario>(this.apiUsuarios + usuario.id, usuario, this.buildRequestOptions())
      .pipe(catchError(this.errorHandler)).toPromise();
  }

  async deleteUsuario(id: number) {
    return this.http.delete(this.apiUsuarios + id, this.buildRequestOptions())
      .pipe(catchError(this.errorHandler)).toPromise();
  }
}
