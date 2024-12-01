import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = ''; // Ensure string type
  password: string = ''; // Ensure string type
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (success) => {
        if (success) {
          this.router.navigate(['']);
        } else {
          this.errorMessage = 'Invalid username or password.';
        }
      },
      error: () => {
        this.errorMessage = 'An error occurred. Please try again later.';
      },
    });
  }
}
