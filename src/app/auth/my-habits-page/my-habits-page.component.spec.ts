import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHabitsPageComponent } from './my-habits-page.component';

describe('MyHabitsPageComponent', () => {
  let component: MyHabitsPageComponent;
  let fixture: ComponentFixture<MyHabitsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyHabitsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyHabitsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
