import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

import { BaseService } from './base.service';
import { ILogin } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {

  private apiLogin: string;

  constructor(private http: HttpClient) {
    super();
    this.apiLogin = this.urlModuloLogin;
  }

  postLogin(login: ILogin) {
    return this.http.post<any>(this.apiLogin, login)
    .pipe( catchError(this.errorHandler) );
  }

  putLogin(login: ILogin) {
    return this.http.put<any>(this.apiLogin, login, this.buildRequestOptions())
      .pipe( catchError(this.errorHandler) );
  }
}
