import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { IHabit } from '../../interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-habit-card',
  templateUrl: './habit-card.component.html',
  styleUrls: ['./habit-card.component.scss'],
})
export class HabitCardComponent implements OnInit {
  @Input() habit: IHabit;
  habits: Array<IHabit> = new Array<IHabit>();

  constructor(private auth: AuthService, private db: AngularFireDatabase) {
    const habits = db.list('habits');
  }

  ngOnInit(): void {}

  addToMyHabits(): void {}
}
