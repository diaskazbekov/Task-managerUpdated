import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from "@angular/forms";

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html'
})
export class TextareaComponent {
  @Input() form!: UntypedFormGroup;
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() controlName: string = '';
}
