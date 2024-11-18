import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EIcon } from "../../../enums/icon.enum";
import {
  ARROW_LEFT_D,
  ARROW_RIGHT_D,
  CALENDER_D,
  CHECK_D,
  MAIL_D,
  RESTORE_D,
  SEARCH_D,
  STAR_D,
  TRASH_D,
  VERTICAL_DOTS_D,
  WARNING_D,
  X_D
} from "../../../constants/svg-path-d.constant";

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent implements OnInit {
  @Input() active: boolean = false;
  @Input() wrapperWidth: number | undefined = undefined;
  @Input() wrapperHeight: number | undefined = undefined;
  @Input() icon: EIcon | string = '';
  @Input() width: number = 16;
  @Input() height: number = 16;
  @Input() repeat: number[] = [0];
  @Input() fill: string = 'none';
  @Input() pointer: boolean = false;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  protected readonly iconName = EIcon;
  protected d: string = '';

  ngOnInit(): void {
    this.d = this.getD();
  }

  getD(): string {
    switch (this.icon) {
      case EIcon.SEARCH:
        return SEARCH_D;
      case EIcon.MAIL:
        return MAIL_D;
      case EIcon.STAR:
        return STAR_D;
      case EIcon.CHECK:
        return CHECK_D;
      case EIcon.TRASH:
        return TRASH_D;
      case EIcon.VERTICAL_DOTS:
        return VERTICAL_DOTS_D;
      case EIcon.WARNING:
        return WARNING_D;
      case EIcon.X:
        return X_D;
      case EIcon.RESTORE:
        return RESTORE_D;
      case EIcon.CALENDER:
        return CALENDER_D;
      case EIcon.ARROW_LEFT:
        return ARROW_LEFT_D;
      case EIcon.ARROW_RIGHT:
        return ARROW_RIGHT_D;
      default:
        return ''
    }
  }
}
