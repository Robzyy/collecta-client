import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from '../primitives/input-text/input-text.component';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'LoginForm',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextComponent],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  logoutMessage: string | null = null;
  private subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.subscription = this.authService.logoutMessage$.subscribe(message => {
      this.logoutMessage = message;
    });
  }

  ngOnInit() {
    this.authService.clearLogoutMessage();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        error: (error) => {
          console.error('Login failed:', error);
        },
      });
    }
  }
}
