import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from '../primitives/input-text/input-text.component';
import { ButtonComponent } from '../primitives/button/button.component';
import { HttpClient } from '@angular/common/http';
import { getPasswordErrors, getEmailErrors, getConfirmPasswordErrors, getUsernameErrors, passwordMatchValidator } from './register-form.validators';

@Component({
  selector: 'RegisterForm',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextComponent, ButtonComponent],
  templateUrl: './register-form.component.html'
})
export class RegisterFormComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    this.registerForm = this.fb.nonNullable.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['']
    }, { validators: passwordMatchValidator() });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { confirmPassword, ...registrationData } = this.registerForm.value;
      this.http.post('/api/users/register', registrationData).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
        },
        error: (error) => {
          if (error.status === 409) {
            // Since we don't know which field caused the conflict,
            // we'll set the error on username as default
            this.registerForm.get('username')?.setErrors({ duplicate: true });
            this.registerForm.updateValueAndValidity();
          }
        }
      });
    }
  }

  get getUsernameErrors(): string {
    return getUsernameErrors(this.registerForm);
  }

  get getEmailErrors(): string {
    return getEmailErrors(this.registerForm);
  }

  get getPasswordErrors(): string {
    return getPasswordErrors(this.registerForm);
  }

  get getConfirmPasswordErrors(): string {
    return getConfirmPasswordErrors(this.registerForm);
  }
}
