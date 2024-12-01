import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.scss'],
})
export class ChangePasswordFormComponent {
  @Output() close = new EventEmitter<void>();

  oldPassword: string = '';
  newPassword1: string = '';
  newPassword2: string = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private http: HttpClient) {}

  onSubmit(): void {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    const url = `${environment.api_host}account/token-auth/`;

    const body = {
      old_password: this.oldPassword,
      new_password1: this.newPassword1,
      new_password2: this.newPassword2,
    };

    this.http.put(url, body, { headers }).subscribe({
      next: () => {
        this.successMessage = 'Password changed successfully!';
        this.errorMessage = null;
        this.close.emit(); // Close the form after success
      },
      error: (error) => {
        this.errorMessage = error.error?.detail || 'Failed to change password.';
        this.successMessage = null;
        console.error(error);
      },
    });
  }

  closeForm(): void {
    this.close.emit();
  }
}
