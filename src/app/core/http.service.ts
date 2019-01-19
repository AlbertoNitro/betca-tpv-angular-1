import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';

import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';

import {Token} from './token.model';
import {Role} from './role.model';
import {Error} from './error.model';

@Injectable()
export class HttpService {

  static API_END_POINT = 'http://localhost:8080/api/v0';
  static UNAUTHORIZED = 401;
  static NOT_FOUND = 404;

  private printDirectly: boolean;
  private token: Token;
  private mobile: number;
  private params: HttpParams;
  private headers: HttpHeaders;
  private responseType: string;
  private successfulNotification = undefined;

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) {
    this.resetOptions();
  }

  getRoles(): Array<Role> {
    return (this.token) ? this.token.roles : undefined;
  }

  getMobile(): number {
    return this.mobile;
  }

  logout(): void {
    this.token = undefined;
    this.mobile = undefined;
    this.router.navigate(['']);
  }

  login(mobile: number, password: string, endPoint: string): Observable<any> {
    return this.authBasic(mobile, password).post(endPoint).pipe(
      map(token => {
        this.token = token;
        this.mobile = mobile;
      }), catchError(error => {
        return this.handleError(error);
      })
    );
  }

  param(key: string, value: string): HttpService {
    this.params = this.params.append(key, value); // This class is immutable
    return this;
  }

  header(key: string, value: string): HttpService {
    this.headers = this.headers.append(key, value); // This class is immutable
    return this;
  }

  authBasic(mobile: number, password: string): HttpService {
    return this.header('Authorization', 'Basic ' + btoa(mobile + ':' + password));
  }

  bearerAuth(): HttpService {
    const tokenValue = (this.token === undefined) ? '' : this.token.token;
    return this.header('Authorization', 'Bearer ' + tokenValue);
  }

  pdf(printDirectly = true): HttpService {
    this.printDirectly = printDirectly;
    this.responseType = 'blob';
    this.header('Accept', 'application/pdf');
    return this;
  }

  successful(notification = 'Successful'): HttpService {
    this.successfulNotification = notification;
    return this;
  }

  get(endpoint: string): Observable<any> {
    return this.http.get(HttpService.API_END_POINT + endpoint, this.createOptions()).pipe(
      map((response => this.extractData(response))
      ), catchError(error => {
        return this.handleError(error);
      })
    );
  }

  post(endpoint: string, body?: Object): Observable<any> {
    return this.http.post(HttpService.API_END_POINT + endpoint, body, this.createOptions()).pipe(
      map((response => this.extractData(response))
      ), catchError(error => {
        return this.handleError(error);
      })
    );
  }

  delete(endpoint: string): Observable<any> {
    return this.http.delete(HttpService.API_END_POINT + endpoint, this.createOptions()).pipe(
      map((response => this.extractData(response))
      ), catchError(error => {
        return this.handleError(error);
      })
    );
  }

  put(endpoint: string, body?: Object): Observable<any> {
    return this.http.put(HttpService.API_END_POINT + endpoint, body, this.createOptions()).pipe(
      map((response => this.extractData(response))
      ), catchError(error => {
        return this.handleError(error);
      })
    );
  }

  patch(endpoint: string, body?: Object): Observable<any> {
    return this.http.patch(HttpService.API_END_POINT + endpoint, body, this.createOptions()).pipe(
      map((response => this.extractData(response))
      ), catchError(error => {
        return this.handleError(error);
      })
    );
  }

  private resetOptions(): void {
    this.headers = new HttpHeaders();
    this.params = new HttpParams();
    this.responseType = 'json';
  }

  private createOptions(): any {
    const options: any = {
      headers: this.headers,
      params: this.params,
      responseType: this.responseType,
      observe: 'response'
    };
    this.resetOptions();
    return options;
  }

  private extractData(response): any {
    if (this.successfulNotification) {
      this.snackBar.open(this.successfulNotification, '', {
        duration: 2000
      });
      this.successfulNotification = undefined;
    }
    const contentType = response.headers.get('content-type');
    if (contentType) {
      if (contentType.indexOf('application/pdf') !== -1) {
        const blob = new Blob([response.body], {type: 'application/pdf'});
        if (this.printDirectly) {
          const iFrame = document.createElement('iframe');
          iFrame.src = URL.createObjectURL(blob);
          iFrame.style.visibility = 'hidden';
          document.body.appendChild(iFrame);
          iFrame.contentWindow.focus();
          iFrame.contentWindow.print();
        } else {
          window.open(window.URL.createObjectURL(blob));
        }
      } else if (contentType.indexOf('application/json') !== -1) {
        return response.body; // with 'text': JSON.parse(response.body);
      }
    } else {
      return response;
    }
  }


  private handleError(response): any {
    let error: Error;
    if (response.status === HttpService.UNAUTHORIZED) {
      this.logout();
    }
    try {
      if (response.status === HttpService.NOT_FOUND) {
        error = {error: 'Not Found', message: 'API Not implemented', path: ''};
      } else {
        error = response.error; // with 'text': JSON.parse(response.error);
      }
      this.snackBar.open(error.error + ': ' + error.message, 'Error', {
        duration: 5000
      });
      return throwError(error);
    } catch (e) {
      this.snackBar.open(response.error, 'Error', {
        duration: 5000
      });
      return throwError(response.error);
    }
  }
}
