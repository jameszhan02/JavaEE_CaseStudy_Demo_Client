import { AbstractControl } from '@angular/forms';
export function ValidateInt(control: AbstractControl): { invalidInt: boolean } {
    const INT_REGEXP =/^\d+$/;
    return !INT_REGEXP.test(control.value) ? { invalidInt: true } : null;
} // ValidateEmail
