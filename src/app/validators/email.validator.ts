import { AbstractControl } from '@angular/forms';
export function ValidateEmail(control: AbstractControl): { invalidEmail: boolean } {
    if (!control.value.includes('@')) {
        return { invalidEmail: true };
      }
      return null;
} // ValidateEmail
