import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FireAuthToken, IUser } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('session-token');
  }
  login(user: IUser): Observable<any> {
    return this.http
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${environment.apiKey}`,
        user
      )
      .pipe(tap(this.setToken), catchError(this.handleError.bind(this)));
  }

  logout(): void {
    this.setToken(null);
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  private setToken(response: FireAuthToken | null): void {
    if (response) {
      const expDate = new Date(
        new Date().getTime() + +response.expiresIn * 1000
      );
      localStorage.setItem('session-token', response.idToken);
      localStorage.setItem('session-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }
}
