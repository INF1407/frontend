import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent {
  token: string = '';
  newPassword: string = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    const url = `${environment.api_host}account/password_reset/confirm/`;
    const body = new FormData();
    body.append('token', this.token);
    body.append('password', this.newPassword);

    this.http.post(url, body).subscribe({
      next: () => {
        this.successMessage = 'Your password has been reset successfully.';
        this.errorMessage = null;

        // Redirect to the login page after 3 seconds
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        this.errorMessage = 'Failed to reset password. Please try again.';
        this.successMessage = null;
        console.error(error);
      },
    });
  }
}
