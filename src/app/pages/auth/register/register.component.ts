import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  user = {
    username: '',
    password: '',
    email: '',
    date_of_birth: '',
  };
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    const url = `${environment.api_host}account/profile/`;

    this.http.post(url, this.user).subscribe({
      next: () => {
        this.successMessage = 'Account created successfully!';
        this.errorMessage = null;

        // Redirect to login page after success
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (error) => {
        this.errorMessage =
          error.error?.detail || 'Failed to create account. Please try again.';
        this.successMessage = null;
        console.error(error);
      },
    });
  }
}
