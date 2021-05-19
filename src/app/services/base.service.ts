import { Injectable } from '@angular/core';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  
  public urlModuloLogin: string
  public urlModuloStock: string
  public urlModuloUsers: string

  constructor() {

    // 'https://envxilr8qlgd.x.pipedream.net/'; // echo server
    // 'https://my-json-server.typicode.com/andres-garcia-alves/stock-control-mvp/'; // fake db
    
    this.urlModuloLogin = 'https://ingenieria2stock.herokuapp.com/api-token-auth/';
    this.urlModuloStock = 'https://ingenieria2stock.herokuapp.com/stock/api/v1/';
    this.urlModuloUsers = 'https://ingenieria2stock.herokuapp.com/users/api/v1/';
  }

  // build the request options object
  public buildRequestOptions(observeResponse: boolean = false): { headers?: any; observe?: any; }  {

    // get authorization token
    const token = (sessionStorage.getItem('token') != null) ? sessionStorage.getItem('token') : '';

    // config authorization token + observe response
    let options: { headers?: any; observe?: any; } = {};
    options.headers = new HttpHeaders( { 'Content-Type': 'application/json', 'Authorization': 'Token ' + token } );
    options.observe = (observeResponse) ? 'response' as 'body' : undefined;

    return options;
  }

  // log to console and re-throw errors
  public errorHandler(err: HttpErrorResponse) {

    if (err.error instanceof ErrorEvent) {
      console.error(`Error: ${err.error.message}`);
    } else {
      console.error(`El backend retornó: Status ${err.status} (${err.statusText}).`);
      console.error(`-> ${err.message}.`);
    }

    return throwError(err);
  }
}
