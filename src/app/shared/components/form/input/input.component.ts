import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html'
})
export class InputComponent {
  @Input() form!: UntypedFormGroup;
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() controlName: string = '';
}
