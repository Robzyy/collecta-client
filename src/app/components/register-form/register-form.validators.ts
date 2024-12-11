import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const group = control as FormGroup;
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  };
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
  if (form.errors?.['mismatch'] && form.get('confirmPassword')?.touched) {
    return 'Passwords do not match';
  }
  return '';
}

export function getEmailErrors(form: FormGroup): string {
  if (form.get('email')?.errors?.['required'] && form.get('email')?.touched) {
    return 'Email is required';
  }
  if (form.get('email')?.errors?.['email'] && form.get('email')?.touched) {
    return 'Invalid email address';
  }
  if (form.get('email')?.errors?.['duplicate']) {
    return 'This email is already in use';
  }
  return '';
}

export function getConfirmPasswordErrors(form: FormGroup): string {
  if (form.errors?.['mismatch'] && form.get('confirmPassword')?.touched) {
    return 'Passwords do not match';
  }
  return '';
}

export function displayNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    if (value.length < 2) {
      return { tooShort: true };
    }

    if (value.length > 50) {
      return { tooLong: true };
    }

    // Only allow letters, numbers, spaces, and basic punctuation
    // Check it out on Regex101 or smth 
    const validCharacters = /^[a-zA-Z0-9\s\-_'.]+$/;
    if (!validCharacters.test(value)) {
      return { invalidCharacters: true };
    }

    return null;
  };
}

export function getDisplayNameErrors(form: FormGroup): string {
  const control = form.get('displayName');
  if (control?.errors) {
    if (control.errors['required'] && control.touched) {
      return 'Display name is required';
    }
    if (control.errors['tooShort']) {
      return 'Display name must be at least 2 characters';
    }
    if (control.errors['tooLong']) {
      return 'Display name cannot exceed 50 characters';
    }
    if (control.errors['invalidCharacters']) {
      return 'Display name can only contain letters, numbers, spaces, and basic punctuation';
    }
  }
  return '';
}
