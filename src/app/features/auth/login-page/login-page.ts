import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.scss'],
})
export class LoginPage {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  isLoading = false;
  errorMessage = '';

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    this.authService.login(email!, password!).subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
      error: (error) => {
        this.errorMessage = error.error?.error || 'Login fallito';
        this.isLoading = false;
      }
    });
  }

  seePassword(): void {
    const passwordField = document.querySelector('input[type="password"]') as HTMLInputElement;
    if (passwordField) {
      if (passwordField.type === 'password') {
        passwordField.type = 'text';
      } else {
        passwordField.type = 'password';
      }
    }
  }
}
