import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const group = control as FormGroup;
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  };
}

export function getUsernameErrors(form: FormGroup): string {
  const control = form.get('username');
  if (control?.errors) {
    if (control.errors['required'] && control.touched) {
      return 'Username is required';
    }
    if (control.errors['minlength']) {
      return 'Username must be at least 3 characters';
    }
    if (control.errors['duplicate']) {
      return 'Username already exists';
    }
  }
  return '';
}

export function getPasswordErrors(form: FormGroup): string {
  const control = form.get('password');
  if (control?.errors) {
    if (control.errors['required'] && control.touched) {
      return 'Password is required';
    }
    if (control.errors['minlength']) {
      return 'Password must be at least 8 characters';
    }
  }
  if (form.errors?.['mismatch'] &&
      form.get('confirmPassword')?.touched) {
    return 'Passwords do not match';
  }
  return '';
}

export function getEmailErrors(form: FormGroup): string {
  if(form.get('email')?.errors?.['required'] && form.get('email')?.touched) {
    return 'Email is required';
  }
  if(form.get('email')?.errors?.['email'] && form.get('email')?.touched) {
    return 'Invalid email address';
  }
  return '';
}

export function getConfirmPasswordErrors(form: FormGroup): string {
  if (form.errors?.['mismatch'] &&
      form.get('confirmPassword')?.touched) {
    return 'Passwords do not match';
  }
  return '';
}
