import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitDialogComponent } from './habit-dialog.component';

describe('HabitDialogComponent', () => {
  let component: HabitDialogComponent;
  let fixture: ComponentFixture<HabitDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HabitDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
