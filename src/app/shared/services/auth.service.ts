import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FireAuthToken, IUser } from '../interfaces';

@Injectable()
// { providedIn: 'root' }
export class AuthService {
  
  public error$: Subject<string> = new Subject<string>();
  constructor(private http: HttpClient) {}

  get token(): string {
    const expDate = new Date(localStorage.getItem('session-token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('session-token');
  }

  //   testPost(): void {
  //     const httpOption = {
  //       headers: new HttpHeaders({ 'Content-Type': 'aplication/json' }),
  //     };

  //     const url =
  //       //   'https://test2-59653-default-rtdb.europe-west1.firebasedatabase.app/users';
  //       'https://habits-a1d60-default-rtdb.europe-west1.firebasedatabase.app/users';

  //     const testing: any = { email: 'email11', password: 'password11' };

  //     this.http.post<any>(`${url}.json`, testing, httpOption).subscribe();
  //   }

 

  login(user: IUser): Observable<any> {
    // user.secureToken = true;
    return this.http
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
        user
      )
      .pipe(tap(this.setToken), catchError(this.handleError.bind(this)));
  }

  logout(): void {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
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
