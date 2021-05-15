import { Component, Input, OnInit } from '@angular/core';
import { IHabit } from '../shared/interfaces';
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

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getHabits().subscribe((res) => {
      this.habits = res;
      this.selectedHabits = this.habits.slice(0, this.loadCount);

      console.log(this.habits);
    });
  }



  loadMore(): void {

    this.startCard = this.endCard;
    this.endCard += 6;
    this.selectedHabits.push(...this.habits.slice(this.startCard, this.endCard));
  }
  rollUp(): void {
    this.selectedHabits = this.habits.slice(0, this.loadCount);
    this.resetStartEnd();
  }

  isShowRollUpButton(): boolean | void {
    if (this.selectedHabits) {
      return this.selectedHabits.length >= 6 && this.selectedHabits.length !== this.habits.length;
    }
  }

  resetStartEnd(): void {
    this.startCard = 0;
    this.endCard = 6;
  }
}
