import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user = {
    first_name: '',
    last_name: '',
    email: '',
    date_of_birth: '',
  };
  successMessage: string | null = null;
  errorMessage: string | null = null;

  showProductForm: boolean = false; // flag for toggling the product form
  showChangePasswordForm: boolean = false; // Toggle for change password form

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    const url = `${environment.api_host}account/profile/`;

    this.http.get(url, { headers }).subscribe({
      next: (response: any) => {
        this.user = response;
      },
      error: (error) => {
        console.error('Failed to load user data:', error);
      },
    });
  }

  onSubmit(): void {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    const url = `${environment.api_host}account/profile/`;

    this.http.put(url, this.user, { headers }).subscribe({
      next: () => {
        this.successMessage = 'Profile updated successfully.';
        this.errorMessage = null;
      },
      error: (error) => {
        this.errorMessage = 'Failed to update profile. Please try again.';
        this.successMessage = null;
        console.error(error);
      },
    });
  }

  createProduct(): void {
    this.showProductForm = true; // Show the product form
  }

  closeProductForm(): void {
    this.showProductForm = false; // Hide the product form
  }

  changePassword(): void {
    this.showChangePasswordForm = true; // Show the change password form
  }

  closeChangePasswordForm(): void {
    this.showChangePasswordForm = false; // Hide the change password form
  }
}
