import { SwiperComponent } from 'swiper/angular';

// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper/core';

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';

import { IHabit, IUser } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, AfterViewInit {
  @ViewChild('upArrow') upArrow: ElementRef;

  habits: IHabit[] = new Array<IHabit>();
  userData: IUser;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.getHabits().subscribe((res) => {
      this.habits = res;
    });
  }

  ngAfterViewInit(): void {
    // Отображение стрелки для поднятия в начало сайта при скроле
    window.addEventListener('scroll', (event: Event) => {
      window.pageYOffset === 0
        ? (this.upArrow.nativeElement.style = 'display: none')
        : (this.upArrow.nativeElement.style = 'display: block');
    });
  }
}
