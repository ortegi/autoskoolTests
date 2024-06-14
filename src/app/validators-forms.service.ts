import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsFormsService {

  constructor() { }

  confirmPassword(): ValidatorFn{
    return (control:FormGroup): ValidationErrors | null => {
      const password1 = control.get('ps1').value;
      const password2 = control.get('ps2').value;

      return password1 === password2 ? null : {confirmPassword : true};
    }
  }

  
}
