import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EIcon } from "../../enums/icon.enum";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss'
})
export class ConfirmComponent {
  @Input() title: string = 'Вы уверены?';
  @Input() description: string = '';
  @Input() buttonText: string = 'Да';
  @Output() onConfirm: EventEmitter<any> = new EventEmitter();
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  protected readonly iconName = EIcon;
}
