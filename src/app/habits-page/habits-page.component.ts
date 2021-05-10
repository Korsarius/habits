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

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.getHabits().subscribe((res) => {
      this.habits = res;
      console.log(this.habits);
    });
  }
}
