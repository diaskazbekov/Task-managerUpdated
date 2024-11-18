import { Component } from '@angular/core';
import { EIcon } from "../../../../shared/enums/icon.enum";

interface IMenuItem {
  title: string;
  icon: EIcon;
  iconWidth: number;
  iconHeight: number;
  link: string;
  hovered?: boolean;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  menu: IMenuItem[] = [
    { title: 'Мои заявки', icon: EIcon.MAIL, iconWidth: 20, iconHeight: 16, link: '' },
    { title: 'Важные', icon: EIcon.STAR, iconWidth: 20, iconHeight: 19, link: 'important' },
    { title: 'Выполненные', icon: EIcon.CHECK, iconWidth: 16, iconHeight: 11, link: 'completed' },
    { title: 'Удаленные', icon: EIcon.TRASH, iconWidth: 18, iconHeight: 20, link: 'deleted' },
  ];
}
