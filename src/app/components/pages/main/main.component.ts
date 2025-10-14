import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription, timer} from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  public activeIndex: number | null = null;

  private latePopup?: Subscription;
  public showPopup: boolean = false;

  constructor() {
  }

  slideConfig = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
  };

  slides = [
    { img: 'assets/images/Баннер1.png' },
    { img: 'assets/images/Баннер2.png' },
    { img: 'assets/images/Баннер3.png' }
  ];

  items = [
    { title: 'Собираете ли вы подарочные боксы?', content: 'Да, у нас есть такая услуга. Мы можем собрать подарочный бокс на любой вкус, объем и стоимость!' },
    { title: 'Сколько у вас разновидностей чая?', content: 'Весь чай Вы можете посмотреть в нашем каталоге.' },
    { title: 'В какой срок осуществляется доставка?', content: 'Доставка осуществляется в зависимости от зоны, которые Вы можете посмотреть на карте.' },
    { title: 'У вас обновляется ассортимент?', content: 'Если Вы хотите следить за обновлениями ассартимета, подпишитесь на рассылку.' },
    { title: 'Какого объема у вас пачки чая?', content: 'Есть пакетики стандартного объема по 25г, так же и по 100г.' },
  ];

  accordion(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  closePopup() {
    this.showPopup = false;
  }

  ngOnInit(): void {
    this.latePopup = timer(10000).subscribe(() => {
      this.showPopup = true;
    });
  }

  ngOnDestroy(): void {
    this.latePopup?.unsubscribe();
  }

}
