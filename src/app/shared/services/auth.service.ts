import { Observable } from 'rxjs';

import { Injectable, NgZone } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { IUser } from '../../shared/interfaces';

@Injectable()
export class AuthService {
  userData: any; // Save logged in user data

  private httpOption = {
    headers: new HttpHeaders({ 'Content-Type': 'aplication/json' }),
  };

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private realtimeDb: AngularFireDatabase, //Inject Realtime DataBase service
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
        console.log('result.user.uid: ', result.user.uid);
        this.ngZone.run(() => {
          this.router.navigate(['/']);
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign up with email/password
  SignUp(email: string, password: string, user: IUser): Promise<void> {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log('result: ', result);
        console.log('result.user.uid: ', result.user.uid);
        this.recordUserData(result.user.uid, user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Метод для добавления нового пользователя в Realtime DataBase
  recordUserData(uid: string, user?: IUser): Promise<void> {
    const items = this.realtimeDb.list('users').set(uid, user);
    return items;
  }

  // Метод для получения всех объектов коллекций
  getUsers(): Observable<any> {
    const items = this.realtimeDb.list('users').valueChanges();
    return items;
  }
}
