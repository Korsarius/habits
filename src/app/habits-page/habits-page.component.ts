import { debounceTime } from 'rxjs/operators';

import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { IHabit, IUser } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-habits-page',
  templateUrl: './habits-page.component.html',
  styleUrls: ['./habits-page.component.scss'],
})
export class HabitsPageComponent implements OnInit {
  habits: IHabit[] = new Array<IHabit>();
  startCard: number = 0;
  endCard: number = 6;
  selectedHabits: IHabit[];
  loadCount: number = 6;
  filterControl: FormControl = new FormControl();
  notFound: boolean = false;
  filteredHabits: IHabit[] = new Array<IHabit>();
  trimmedHabits: IHabit[] = new Array<IHabit>();

  user: IUser;
  allHabitsKeys: string[];
  myHabitsId: string[];
  counter: number = 0;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.handleFilter();
    this.user = JSON.parse(localStorage.getItem('user'));
    this.myHabitsId = JSON.parse(localStorage.getItem('myHabitsId'));
    this.auth.getHabits().subscribe((res) => {
      this.habits = res;
      this.trimmedHabits = this.habits.slice(this.startCard, 6);
    });
  }

  handleFilter(): void {
    this.filterControl.valueChanges
      .pipe(
        // takeWhile(() => this.alive),
        debounceTime(1000)
      )
      .subscribe((value) => {
        if (value === '') {
          this.filteredHabits = new Array<IHabit>();
          this.notFound = this.filteredHabits.length !== 0;
          this.trimmedHabits = this.habits.slice(0, 6);
        } else {
          this.filteredHabits = this.habits.filter(
            (habit) =>
              habit.type.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
              habit.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
          );
          this.notFound = this.filteredHabits.length === 0;
          this.trimmedHabits = new Array<IHabit>();
        }
      });
  }

  clearFilter(): void {
    /**  Simulate server response delay */
    setTimeout(() => {
      this.notFound = false;
      this.filteredHabits = new Array<IHabit>();
      this.trimmedHabits = this.habits.slice(0, 6);
    }, 500);
  }

  loadMore(): void {
    this.startCard = this.endCard;
    this.endCard += 6;
    this.trimmedHabits.push(...this.habits.slice(this.startCard, this.endCard));
  }

  rollUp(): void {
    this.trimmedHabits = this.habits.slice(0, 6);
    this.resetStartEnd();
  }

  isShowRollUpButton(): boolean | void {
    if (this.selectedHabits) {
      return (
        this.selectedHabits.length >= 6 &&
        this.selectedHabits.length !== this.habits.length
      );
    }
  }

  resetStartEnd(): void {
    this.startCard = 0;
    this.endCard = 6;
  }
}
