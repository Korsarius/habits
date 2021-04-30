import { Injectable, NgZone } from '@angular/core';
// import {
//   HttpClient,
//   HttpErrorResponse,
//   HttpHeaders,
// } from '@angular/common/http';
// import { Observable, Subject, throwError } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';
// import { environment } from 'src/environments/environment';
// import { FireAuthToken, IUser } from '../interfaces';
import { IUser } from '../../shared/interfaces';
// import { auth } from 'firebase/app';
// import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  // Sign in with email/password
  SignIn(email: string, password: string): Promise<void> {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log('result: ', result);
        this.ngZone.run(() => {
          this.router.navigate(['/']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: IUser): Promise<void> {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: IUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  // public error$: Subject<string> = new Subject<string>();
  // constructor(private http: HttpClient) {}

  // get token(): string {
  //   const expDate = new Date(localStorage.getItem('session-token-exp'));
  //   if (new Date() > expDate) {
  //     this.logout();
  //     return null;
  //   }
  //   return localStorage.getItem('session-token');
  // }

  // //   testPost(): void {
  // //     const httpOption = {
  // //       headers: new HttpHeaders({ 'Content-Type': 'aplication/json' }),
  // //     };

  // //     const url =
  // //       //   'https://test2-59653-default-rtdb.europe-west1.firebasedatabase.app/users';
  // //       'https://habits-a1d60-default-rtdb.europe-west1.firebasedatabase.app/users';

  // //     const testing: any = { email: 'email11', password: 'password11' };

  // //     this.http.post<any>(`${url}.json`, testing, httpOption).subscribe();
  // //   }

  // login(user: IUser): Observable<any> {
  //   // user.secureToken = true;
  //   return this.http
  //     .post(
  //       `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
  //       user
  //     )
  //     .pipe(tap(this.setToken), catchError(this.handleError.bind(this)));
  // }

  // getUser(id: string): Observable<any> {
  //   const url: string = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}/users/${id}`;
  //   return this.http.get<IUser>(url);
  //   // .pipe(catchError(this.handleError<ICar>(`getCar id=${id}`)));
  //   // return this.http
  //   //   .get(
  //   //     `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
  //   //     user
  //   //   )
  //   //   .pipe(tap(this.setToken), catchError(this.handleError.bind(this)));
  // }

  // logout(): void {
  //   this.setToken(null);
  // }

  // isAuthenticated(): boolean {
  //   return !!this.token;
  // }

  // private handleError(error: HttpErrorResponse) {
  //   return throwError(error);
  // }
  // // try angular Fire
  // private setToken(response: FireAuthToken | null): void {
  //   if (response) {
  //     const expDate = new Date(
  //       new Date().getTime() + +response.expiresIn * 1000
  //     );
  //     localStorage.setItem('session-token', response.idToken);
  //     localStorage.setItem('session-token-exp', expDate.toString());
  //   } else {
  //     localStorage.clear();
  //   }
  // }
}
