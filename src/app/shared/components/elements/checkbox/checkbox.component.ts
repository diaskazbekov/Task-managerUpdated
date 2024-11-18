import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent {
  @Input() text: string = '';
  @Input() checked: boolean | undefined = false;
  @Output() onCheck: EventEmitter<boolean> = new EventEmitter();

  click(): void {
    this.checked = !this.checked;
    this.onCheck.emit(this.checked);
  }
}
