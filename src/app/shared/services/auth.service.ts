import { Observable, of, pipe, throwError } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { IHabit, IUser } from '../../shared/interfaces';

@Injectable()
export class AuthService {
  userData: IUser | null;

  private httpOption = {
    headers: new HttpHeaders({ 'Content-Type': 'aplication/json' }),
  };

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private realtimeDb: AngularFireDatabase, //Inject Realtime DataBase service
    public router: Router
  ) { }

  handleError(error: any): Observable<any> {
    console.log('error: ', error);
    return of(error);
  }

  // Sign in with email/password
  SignIn(email: string, password: string): Promise<void> {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log('result: ', result);
        this.getUser(result.user.uid).subscribe((user: IUser) => {
          console.log('user: ', user);
          if (!user) {
            window.alert('User not found');
            location.reload();
          }
          const currentUser: IUser = user;
          currentUser.uid = result.user.uid;
          localStorage.setItem('user', JSON.stringify(currentUser));
          this.router.navigate(['/']);
        });
      })
      .catch((error) => {
        window.alert(error.message);
        location.reload();
      });
  }

  // Sign up with email/password
  SignUp(email: string, password: string, user: IUser): Promise<void> {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(async (result) => {
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

  // Метод для обновления пользователя по ID в Realtime DataBase
  updateUser(user: IUser, uid: string): Promise<void> {
    const itemUser = this.realtimeDb.object(`users/${uid}`);
    return itemUser.update(user);
  }

  // Метод для добавления новой привычки в habits в Realtime DataBase
  addNewHabit(habit: IHabit): void {
    const itemHabits = this.realtimeDb.list(`habits`);
    itemHabits.push(habit);
  }
  //Метод для получения всех привычек
  getHabits(): Observable<any> {
    const habits = this.realtimeDb.list('habits').valueChanges();
    return habits;

  }

  getHabit(): void {
    
    //  const itemRef = this.realtimeDb.list('habits');
    // itemRef.snapshotChanges().subscribe(action => {
    //   console.log(action.type);
    //   console.log(action.key)
    //   // console.log(action.payload.val())
    // });
    const itemsRef = this.realtimeDb.list('habits');
    // Use snapshotChanges().map() to store the key
    const items = itemsRef.snapshotChanges().pipe(map(changes => {
      return changes.map(c => {
        console.log(c.payload.key);
        // return { key: c.payload.key, ...c.payload.val() }
      });
    })).subscribe();
  }

  // Метод для добавления новых привычек в MyHabits в Realtime DataBase
  addToMyHabits(habit: IHabit, user: IUser): void {
    const myHabits = this.realtimeDb.list(`users/${user.uid}/myHabits`);
    myHabits.push(habit);

  }
  // Метод для удаления  привычки из MyHabits в Realtime DataBase
  deleteMyHabit(habit: IHabit, user: IUser): Promise<void> {

    const myHabit = this.realtimeDb.object(`users/${user.uid}/myHabits/${habit.hid}`);
    return myHabit.remove();
  }
  // Метод для получения всех  привычек из MyHabits 
  getMyHabits(user: IUser): Observable<any> {
    const myHabits = this.realtimeDb.list(`users/${user.uid}/myHabitss`).valueChanges();
    return myHabits;
  }
}
