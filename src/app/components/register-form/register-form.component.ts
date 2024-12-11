import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from '../primitives/input-text/input-text.component';
import { ButtonComponent } from '../primitives/button/button.component';
import {
  getPasswordErrors,
  getEmailErrors,
  getConfirmPasswordErrors,
  passwordMatchValidator,
  getDisplayNameErrors,
  displayNameValidator,
} from './register-form.validators';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'RegisterForm',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextComponent,
    ButtonComponent,
  ],
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.registerForm = this.fb.nonNullable.group(
      {
        email: ['', [Validators.required, Validators.email]],
        displayName: ['', [Validators.required, displayNameValidator()]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: [''],
      },
      { validators: passwordMatchValidator() },
    );
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { confirmPassword, ...registrationData } = this.registerForm.value;
      this.authService.register(registrationData).subscribe({
        error: (error) => {
          if (error.status === 409) {
            this.registerForm.get('email')?.setErrors({ duplicate: true });
            this.registerForm.updateValueAndValidity();
          }
        },
      });
    }
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

  get getDisplayNameErrors(): string {
    return getDisplayNameErrors(this.registerForm);
  }
}
