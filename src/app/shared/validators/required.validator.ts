import { AbstractControl } from '@angular/forms';

interface IResponse {
  required: boolean;
}

export function requiredValidator(control: AbstractControl): IResponse | null {
  if (!control.value || (typeof control.value === 'string' && !control.value.trim())) {
    return {
      required: true
    };
  }

  return null;
}


