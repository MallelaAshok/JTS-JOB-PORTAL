import { AbstractControl, Validators } from '@angular/forms';

export class CustomValidators {
  static website(control: AbstractControl): { [key: string]: boolean } | null {
    if (Validators.required(control) !== null) {
      return null; // Let required validator handle empty values
    }

    const value = control.value;
    if (!value.startsWith('https://') && !value.startsWith('www.')) {
      return { 'invalidWebsite': true };
    }
    return null;
  }
}
