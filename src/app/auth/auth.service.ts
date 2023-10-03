import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';

import { environment } from './../../environments/environment';
import { LoginRequest } from './login-request';
import { LoginResult } from './login-result';
import { ToastrService } from 'ngx-toastr';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private tokenKey: string = "token"; 
  private _authStatus = new Subject<boolean>();
  public authStatus = this._authStatus.asObservable();

  constructor(
    protected http: HttpClient,
    private toastr: ToastrService) {
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  init(): void {
    if (this.isAuthenticated())
      this.setAuthStatus(true);
  }

  login(item: LoginRequest): Observable<LoginResult> {
    var url = environment.UrlApi + "api/auth/login";
    return this.http.post<LoginResult>(url, item)
      .pipe(
        catchError((error: any) => {
          this.showError('Usuário ou Senha Incorretos');
          return throwError(error); // Reenvia o erro para ser tratado em outro lugar, se necessário
        }),
        tap(loginResult => {
          if (loginResult && loginResult.success && loginResult.token) {
            // Login bem-sucedido
            localStorage.setItem(this.tokenKey, loginResult.token);
            this.setAuthStatus(true);
            this.showSuccess();
          }
        })
      );
  }
  

  showSuccess() {
    this.toastr.success('Login Feito com Sucesso!', 'Seja Bem vindo!');
  }

  showError(mensagem : string) {
    this.toastr.error(mensagem, "Error");
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.setAuthStatus(false);
  }

  private setAuthStatus(isAuthenticated: boolean): void {
    this._authStatus.next(isAuthenticated);
  }
}
