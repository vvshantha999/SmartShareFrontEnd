import {Directive} from '@angular/core';
import {ValidationErrors, Validator, NG_VALIDATORS, AbstractControl, FormGroup} from '@angular/forms';

@Directive({
  selector: '[appValidateConfirmPassword][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: ConfirmPasswordValidator, multi: true}]
})
export class ConfirmPasswordValidator implements Validator {
  constructor() {
  }

  validate(formValues: AbstractControl): ValidationErrors | null {
    const confirmPasswordControl = formValues;
    const passwordControl = (formValues.root as FormGroup).controls.password;
    if ((confirmPasswordControl.value === passwordControl.value)) {
      return null;
    } else {
      return ({appValidateConfirmPassword: false});
    }
  }
}
