import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { IHabit, IUser } from '../../interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-habit-card',
  templateUrl: './habit-card.component.html',
  styleUrls: ['./habit-card.component.scss'],
})
export class HabitCardComponent implements OnInit {
  @Input() habit: IHabit;

  habits: Array<IHabit> = new Array<IHabit>();
  isAdded:boolean = false;
  user: IUser;
  isLoggenIn:boolean;
  isShow:boolean = false;
  isCancel: boolean = false;
  

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    console.log(this.habit);
    this.user = JSON.parse(localStorage.getItem('user'));
    this.isLoggenIn = !!localStorage.getItem('user');
    
  }

  addToMyHabits(): void {
    this.isAdded = !this.isAdded;
    this.auth.addToMyHabits(this.habit, this.user);
  }
  
  toggleVisibility(): void{
    this.isShow = true;
  }

  toggleCancel(): void{
    this.isCancel= true;
    this.isShow = false;
  }
}
