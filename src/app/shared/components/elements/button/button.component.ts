import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() outlined: boolean = false;
  @Input() danger: boolean = false;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
}
