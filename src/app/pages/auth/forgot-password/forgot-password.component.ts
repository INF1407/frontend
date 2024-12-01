import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  email: string = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    const url = `${environment.api_host}account/password_reset/`;
    const body = { email: this.email };

    this.http.post(url, body).subscribe({
      next: (response) => {
        this.successMessage =
          'Password reset link has been sent to your email address.';
        this.errorMessage = null;

        // Redirect to the password reset page after 3 seconds
        setTimeout(() => {
          this.router.navigate(['/password-reset']);
        }, 2000);
      },
      error: (error) => {
        this.errorMessage =
          'Failed to send password reset link. Please try again.';
        this.successMessage = null;
        console.error(error);
      },
    });
  }
}
