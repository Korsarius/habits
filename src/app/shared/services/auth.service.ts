import { BehaviorSubject, Observable, of, pipe, throwError } from 'rxjs';
import { tap, map, switchMap, take } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList,
  SnapshotAction,
} from '@angular/fire/database';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { IHabit, IUser } from '../../shared/interfaces';

@Injectable()
export class AuthService {
  userData: IUser | null;

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private realtimeDb: AngularFireDatabase, //Inject Realtime DataBase service
    public router: Router
  ) {}

  handleError(error: any): Observable<any> {
    console.log('error: ', error);
    return of(error);
  }

  // Sign in with email/password
  async SignIn(email: string, password: string): Promise<void> {
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
  async SignUp(email: string, password: string, user: IUser): Promise<void> {
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

  // SignOut method for logging out from the Angular/Firebase app
  SignOut(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  // Метод для добавления нового пользователя в Realtime DataBase
  recordUserData(uid: string, user?: IUser): Promise<void> {
    const items: Promise<void> = this.realtimeDb.list('users').set(uid, user);
    return items;
  }

  // Метод для получения всех пользователей в Realtime DataBase
  getUsers(): Observable<IUser[]> {
    const users: Observable<IUser[]> = this.realtimeDb
      .list('users')
      .valueChanges();
    return users;
  }

  // Метод для получения пользователя по ID в Realtime DataBase
  getUser(uid: string): Observable<IUser> {
    const user: Observable<IUser> = this.realtimeDb
      .object(`users/${uid}`)
      .valueChanges();
    return user;
  }

  // Метод для обновления пользователя по ID в Realtime DataBase
  updateUser(user: IUser, uid: string): Promise<void> {
    const itemUser: AngularFireObject<IUser> = this.realtimeDb.object(
      `users/${uid}`
    );
    return itemUser.update(user);
  }

  // Метод для добавления новой привычки в habits в Realtime DataBase
  addNewMyHabit(user: IUser, habit: IHabit): void {
    const itemHabits: AngularFireList<IHabit> = this.realtimeDb.list(
      `users/${user.uid}/myHabits`
    );
    itemHabits.push(habit);
  }

  // Метод для получения всех привычек
  getHabits(): Observable<any> {
    const habits: Observable<any> = this.realtimeDb
      .list('habits')
      .valueChanges();
    return habits;
  }

  getMyHabitsId(user: IUser): void {
    const itemsRef: AngularFireList<IHabit[]> = this.realtimeDb.list(
      `users/${user.uid}/myHabits`
    );
    // Use snapshotChanges().map() to store the key
    let myHabitsId: string[] = new Array();
    itemsRef
      .snapshotChanges()
      .pipe(
        map((changes: SnapshotAction<IHabit[]>[]) => {
          return changes.map((habit: SnapshotAction<IHabit[]>) => {
            myHabitsId.push(habit.payload.key);
          });
        })
      )
      .subscribe(() => {
        myHabitsId = Array.from(new Set(myHabitsId));
        setTimeout(() => {
          localStorage.setItem('myHabitsId', JSON.stringify(myHabitsId));
        }, 500);
      });
  }

  getAllHabitsId(): void {
    const itemsRef: AngularFireList<IHabit[]> = this.realtimeDb.list('habits');
    // Use snapshotChanges().map() to store the key
    let allHabitsId: string[] = new Array();
    itemsRef
      .snapshotChanges()
      .pipe(
        map((changes: SnapshotAction<IHabit[]>[]) => {
          return changes.map((habit: SnapshotAction<IHabit[]>) => {
            allHabitsId.push(habit.payload.key);
          });
        })
      )
      .subscribe(() => {
        allHabitsId = Array.from(new Set(allHabitsId));
        setTimeout(() => {
          localStorage.setItem('allHabitsId', JSON.stringify(allHabitsId));
        }, 500);
      });
  }

  // Метод для добавления новых привычек в MyHabits в Realtime DataBase
  addToMyHabits(habit: IHabit, user: IUser): void {
    const myHabits: AngularFireList<IHabit> = this.realtimeDb.list(
      `users/${user.uid}/myHabits`
    );
    myHabits.push(habit);
    this.getUser(user.uid)
      .pipe(take(1))
      .subscribe((newUserInfo) => {
        newUserInfo.uid = JSON.parse(localStorage.getItem('user')).uid;
        localStorage.setItem('user', JSON.stringify(newUserInfo));
        // this.getMyHabits(newUserInfo).pipe(take(1)).subscribe((myNewHabits) => {
        //   console.log('myNewHabits: ', myNewHabits);
        // });
      });
  }

  updateMyHabit(habit: IHabit, user: IUser): void {
    console.log(habit.hid);
    const myHabit: AngularFireObject<IHabit> = this.realtimeDb.object(
      `users/${user.uid}/myHabits/${habit.hid}`
    );
    myHabit.update(habit);
  }

  // Метод для удаления привычки из MyHabits в Realtime DataBase
  deleteMyHabit(habit: IHabit, user: IUser): void {
    const myHabit: AngularFireObject<IHabit> = this.realtimeDb.object(
      `users/${user.uid}/myHabits/${habit.ownId || habit.hid}`
    );
    myHabit.remove();
    this.getUser(user.uid)
      .pipe(take(1))
      .subscribe((newUserInfo) => {
        newUserInfo.uid = JSON.parse(localStorage.getItem('user')).uid;
        localStorage.setItem('user', JSON.stringify(newUserInfo));
        // this.getMyHabits(newUserInfo).pipe(take(1)).subscribe((myNewHabits) => {
        //   console.log('myNewHabits: ', myNewHabits);
        // });
      });
  }

  // Метод для удаления всех привычек из MyHabits в Realtime DataBase
  deleteAllMyHabit(user: IUser): Promise<void> {
    const myHabit: AngularFireObject<IHabit> = this.realtimeDb.object(
      `users/${user.uid}/myHabits`
    );
    return myHabit.remove();
  }

  // Метод для получения всех  привычек из MyHabits
  getMyHabits(user: IUser): Observable<any> {
    const myHabits: Observable<any> = this.realtimeDb
      .list(`users/${user.uid}/myHabits`)
      .valueChanges();
    return myHabits;
  }
}
