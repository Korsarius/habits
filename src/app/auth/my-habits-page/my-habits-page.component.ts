import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

import { HabitDialogComponent } from 'src/app/shared/components/habit-dialog/habit-dialog.component';
import { IHabit, IUser } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-my-habits-page',
  templateUrl: './my-habits-page.component.html',
  styleUrls: ['./my-habits-page.component.scss'],
})
export class MyHabitsPageComponent implements OnInit {

  allHabitsList: Array<IHabit>;
  user: IUser;


  displayedColumns: string[] = ['Index', 'Habit Name', 'Frequency', 'Type', 'Public', 'Delete'];
  dataSource: MatTableDataSource<IHabit>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private auth: AuthService) { }


  ngOnInit(): void {

    this.auth.getHabit();
    
    this.user= JSON.parse(localStorage.getItem('user'));
    console.log('this.userData: ', this.user);

    this.auth.getMyHabits(this.user).subscribe(res => {
      console.log('res', res);
      this.allHabitsList = res;
      this.dataSource = new MatTableDataSource(this.allHabitsList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
      err => console.log(err)
    );
  }


  openDialog() {
    const dialogRef = this.dialog.open(HabitDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }


  openConfirmDialog(habit: IHabit, user: IUser): void {
  
    console.log(habit);
    const confirmDialog = this.dialog.open(ConfirmationDialogComponent);
    confirmDialog.afterClosed().subscribe( async result => {
      console.log('res', result);
      if (result) {
       await this.auth.deleteMyHabit(habit, user);

      }
    })



  }

  updateTable(): void {
  //   this.auth.getMyHabits().subscribe(res => {
  //     this.allHabitsList = res;
  //     this.dataSource = new MatTableDataSource(this.allHabitsList);
  //     this.dataSource.sort = this.sort;
  //     this.dataSource.paginator = this.paginator;
  //   },
  //     err => console.log(err)
  //   );
  }
}
