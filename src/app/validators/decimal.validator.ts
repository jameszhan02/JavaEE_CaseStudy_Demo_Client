// import { AbstractControl } from '@angular/forms';
// export function ValidateDecimal(control: AbstractControl): { invalidDecimal: boolean } {
//     const DECIMAL_REGEXP =/^(\d*\.)?\d+$/;
//     return !DECIMAL_REGEXP.test(control.value) ? { invalidDecimal: true } : null;
//     // if (!control.value.includes('.')) {
//     //     return { invalidDecimal: true };
//     //   }
//     //   return null;
// } // ValidateDecimal

import { AbstractControl } from '@angular/forms';
export function ValidateDecimal(control: AbstractControl): { invalidDecimal: boolean } {
    if (!control.value.toString(10).includes('.')) {
        return { invalidDecimal: true };
      }
      return null;
} // ValidateEmail
