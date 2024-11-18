import { Component, Input } from '@angular/core';
import { AbstractControl } from "@angular/forms";

@Component({
  selector: 'app-validation-errors',
  templateUrl: './validation-errors.component.html',
  styleUrl: './validation-errors.component.scss'
})
export class ValidationErrorsComponent {
  @Input() control!: AbstractControl;
}
