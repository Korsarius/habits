import { Component, Input, OnInit } from '@angular/core';
import { IHabit, IUser } from '../../interfaces';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-habit-card',
  templateUrl: './habit-card.component.html',
  styleUrls: ['./habit-card.component.scss'],
})
export class HabitCardComponent implements OnInit {
  @Input() habit: IHabit;
  @Input() userHabits: IHabit[];
  @Input() userHabitsId: string[];

  habits: Array<IHabit> = new Array<IHabit>();
  isAdded: boolean = false;
  user: IUser;
  isLoggenIn: boolean;
  isShow: boolean = false;
  isCancel: boolean = false;

  myHabitsId: string[];
  allHabitsKeys: string[];

  constructor(private auth: AuthService, private route: Router) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.auth.getAllHabitsId();
    this.allHabitsKeys = JSON.parse(localStorage.getItem('allHabitsId'));
    for (const habit in this.userHabits) {
      if (this.habit.title === this.userHabits[habit].title) {
        this.habit.hid = this.userHabits[habit].hid;
        this.habit.exist = true;
      }
    }
    this.isLoggenIn = !!localStorage.getItem('user');
  }

  deleteFromMyHabits(habit: IHabit): void {
    this.habit.exist = false;
    let equalIndex: number = 0;
    const userHabits: IHabit[] = new Array<IHabit>();
    for (const habit in this.user.myHabits) {
      userHabits.push(this.user.myHabits[habit]);
    }
    userHabits.map((item, index) => {
      if (item.title === habit.title) {
        equalIndex = index;
      }
    });
    if (this.user.myHabits) {
      const userHabitsId: string[] = Object.keys(this.user.myHabits);
      habit.ownId = userHabitsId[equalIndex];
    }
    this.auth.deleteMyHabit(habit, this.user);
    this.route.navigate(['/habits']);
  }

  addToMyHabits(habit: IHabit): void {
    this.habit.exist = true;
    this.auth.addToMyHabits(habit, this.user);
    this.route.navigate(['/habits']);
  }

  toggleVisibility(): void {
    this.isShow = true;
  }

  toggleCancel(): void {
    this.isCancel = true;
    this.isShow = false;
  }
}
