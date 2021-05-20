import { Observable } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { HabitDialogComponent } from 'src/app/shared/components/habit-dialog/habit-dialog.component';
import { IHabit, IUser } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-my-habits-page',
  templateUrl: './my-habits-page.component.html',
  styleUrls: ['./my-habits-page.component.scss'],
})
export class MyHabitsPageComponent implements OnInit, OnDestroy {
  allHabitsList: Array<IHabit>;
  user: IUser;
  valueFilter: string = '';
  loading: boolean;
  isAlive: boolean = true;

  displayedColumns: string[] = [
    'counter',
    'title',
    'frequency',
    'type',
    'public',
    'delete',
  ];
  dataSource: MatTableDataSource<IHabit> = new MatTableDataSource<IHabit>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  pagination$: Observable<string>;

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    public router: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.valueFilter = this.router.snapshot.queryParams['filter'];
    this.user = JSON.parse(localStorage.getItem('user'));
    this.auth.getMyHabitsId(this.user);
    this.updateTable();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(HabitDialogComponent);
    dialogRef
      .afterClosed()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe();
  }

  openConfirmDialog(habit: IHabit, user: IUser): void {
    const confirmDialog = this.dialog.open(ConfirmationDialogComponent);
    confirmDialog
      .afterClosed()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(async (result) => {
        if (result) {
          await this.auth.deleteMyHabit(habit, user);
          this.updateTable();
          this.route.navigate([['/profile',  user.uid, 'myhabits']]);
        }
      });
  }

  openEditDialogWithHabitForm(habit: IHabit, user: IUser): void {
    const confirmDialog = this.dialog.open(HabitDialogComponent, {
      data: { habit, user },
    });
    confirmDialog
      .afterClosed()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(async (result) => {
        if (result) {
          this.updateTable();
          this.route.navigate([['/profile',  user.uid, 'myhabits']]);
        }
      });
  }

  updateTable(): void {
    this.auth.getMyHabitsId(this.user);
    setTimeout(() => {
      this.auth
        .getMyHabits(this.user)
        .pipe(takeWhile(() => this.isAlive))
        .subscribe(
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

            this.dataSource = new MatTableDataSource<IHabit>(
              this.allHabitsList
            );
            this.dataSource.sort = this.sort;

            // get url params form router: ActivatedRoute
            this.router.queryParams
              .pipe(takeWhile(() => this.isAlive))
              .subscribe((urlParams) => {
                let paginationValue: number = +urlParams.pagination; // get pagination value from url
                const filterValue: string = urlParams.filter; // get filter value from url

                if (filterValue) {
                  this.dataSource.filter = filterValue
                    .trim()
                    .toLocaleLowerCase();
                }

                // default table pagination value if it exists in url params
                if (
                  urlParams.pagination &&
                  this.paginator.pageSize !== +urlParams.pagination
                ) {
                  this.paginator._changePageSize(+urlParams.pagination);
                }

                this.dataSource.paginator = this.paginator;
                this.dataSource.paginator.page
                  .pipe(takeWhile(() => this.isAlive))
                  .subscribe((paginationV) => {
                    paginationValue = paginationV.pageSize;
                    this.route.navigate([], {
                      relativeTo: this.router,
                      queryParams: { pagination: paginationValue.toString() },
                      queryParamsHandling: 'merge', // remove to replace all query params by provided
                    });
                  });
                this.loading = false;
              });
          },
          (err) => console.log(err)
        );
    }, 1000);
  }

  applyFilter(value: string): void {
    // this.router.queryParams
    // .pipe(takeWhile(() => this.isAlive))
    // .subscribe((urlParams) => {
    //   let filterValue: string = urlParams.filter; // get filter value from url
    // });
    
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    this.route.navigate([], {
      relativeTo: this.router,
      queryParams: { filter: this.dataSource.filter },
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
  }




  claenFilter(): void {
    this.valueFilter = '';
    this.route.navigate([], {
      relativeTo: this.router,
      queryParams: { filter: '' },
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
    this.updateTable();
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }
}
