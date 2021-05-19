import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs/operators';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

import { HabitDialogComponent } from 'src/app/shared/components/habit-dialog/habit-dialog.component';
import { HabitFormComponent } from 'src/app/shared/components/habit-form/habit-form.component';
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
  valueFilter: string = '';
  loading: boolean;

  displayedColumns: string[] = [
    'Index',
    'Habit Name',
    'Frequency',
    'Type',
    'Public',
    'Delete',
  ];
  dataSource: MatTableDataSource<IHabit>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private auth: AuthService) {}

  ngOnInit(): void {
    this.loading = true;
    this.user = JSON.parse(localStorage.getItem('user'));
    this.auth.getMyHabitsId(this.user);
    setTimeout(() => {
      this.auth.getMyHabits(this.user).subscribe(
        (res) => {
          this.allHabitsList = res;
          this.allHabitsList.map((habit: IHabit, index: number) => {
            JSON.parse(localStorage.getItem('myHabitsId')).map(
              (id: string, i: number) => {
                if (index === i) {
                  habit.hid = id;
                }
              }
            );
          });
          this.dataSource = new MatTableDataSource(this.allHabitsList);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.loading = false;
        },
        (err) => console.log(err)
      );
    }, 1000);
    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(HabitDialogComponent);
    dialogRef.afterClosed().subscribe();
  }

  openConfirmDialog(habit: IHabit, user: IUser): void {
    const confirmDialog = this.dialog.open(ConfirmationDialogComponent);
    confirmDialog.afterClosed().subscribe(async (result) => {
      if (result) {
        await this.auth.deleteMyHabit(habit, user);
        this.updateTable();
      }
    });
  }

  openEditDialogWithHabitForm(habit: IHabit, user: IUser): void {
    const confirmDialog = this.dialog.open(HabitDialogComponent, {
      data: { habit, user },
    });
    confirmDialog.afterClosed().subscribe(async (result) => {
      if (result) {
        this.updateTable();
      }
    });
  }

  updateTable(): void {
    this.auth.getMyHabitsId(this.user);
    setTimeout(() => {
      this.auth.getMyHabits(this.user).subscribe(
        (res) => {
          this.allHabitsList = res;
          this.allHabitsList.map((habit: IHabit, index: number) => {
            JSON.parse(localStorage.getItem('myHabitsId')).map(
              (id: string, i: number) => {
                if (index === i) {
                  habit.hid = id;
                }
              }
            );
          });
          this.dataSource = new MatTableDataSource(this.allHabitsList);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        (err) => console.log(err)
      );
    }, 1000);
  }

  applyFilter($event: KeyboardEvent): void {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  claenFilter(): void {
    this.valueFilter = '';
    this.updateTable();
  }
}
