import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
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
  private httpOption = {
    headers: new HttpHeaders({ 'Content-Type': 'aplication/json' }),
  };

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private realtimeDb: AngularFireDatabase, //Inject Realtime DataBase service
    public router: Router
  ) {}

  // Sign in with email/password
  SignIn(email: string, password: string): Promise<void> {
    console.log('password: ', password);
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log('result: ', result);
        console.log('result.user.uid: ', result.user.uid);
        this.getUser(result.user.uid).subscribe((user: IUser) => {
          const currentUser: IUser = user;
          currentUser.uid = result.user.uid;
          localStorage.setItem('user', JSON.stringify(currentUser));
          this.router.navigate(['/']);
        });
      })
      .catch((error) => {
        console.log('error: ', error);
        window.alert(error.message);
      });
  }

  // Sign up with email/password
  SignUp(email: string, password: string, user: IUser): Promise<void> {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(async (result) => {
        console.log('result: ', result);
        console.log('result.user.uid: ', result.user.uid);
        await this.recordUserData(result.user.uid, user);
        await this.SignIn(email, password);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // // SignOut method for logging out from the Angular/Firebase app
  // SignOut(): Promise<void> {
  //   return this.afAuth.signOut().then(() => {
  //     this.router.navigate(['/']);
  //   });
  // }

  // Метод для добавления нового пользователя в Realtime DataBase
  recordUserData(uid: string, user?: IUser): Promise<void> {
    const items = this.realtimeDb.list('users').set(uid, user);
    return items;
  }

  // Метод для получения всех пользователей в Realtime DataBase
  getUsers(): Observable<any> {
    const users = this.realtimeDb.list('users').valueChanges();
    return users;
  }

  // Метод для получения пользователя по ID в Realtime DataBase
  getUser(uid: string): Observable<any> {
    const user = this.realtimeDb.object(`users/${uid}`).valueChanges();
    return user;
  }
}
