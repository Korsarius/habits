import { Component, Input, OnInit } from '@angular/core';
import { IHabit } from '../shared/interfaces';

@Component({
  selector: 'app-habits-page',
  templateUrl: './habits-page.component.html',
  styleUrls: ['./habits-page.component.scss'],
})
export class HabitsPageComponent implements OnInit {
  @Input() habit: IHabit;
  habits: IHabit[] = new Array<IHabit>();
  constructor() {}

  ngOnInit(): void {}
}
