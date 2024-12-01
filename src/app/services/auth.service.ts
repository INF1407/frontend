import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private userName: string | null = null;

  constructor(private http: HttpClient) {}

  /**
   * Logs the user in by calling the login API.
   * @param username The username
   * @param password The password
   * @returns Observable<boolean> indicating success or failure
   */
  login(username: string, password: string): Observable<boolean> {
    const url = environment.loginAPI;
    const body = { username, password };

    return this.http.post<{ token: string }>(url, body).pipe(
      map((response) => {
        // Save token and update state on success
        localStorage.setItem('auth_token', response.token);
        this.isAuthenticated = true;
        this.userName = username;
        return true; // Indicate successful login
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        if (error.status === 401) {
          // Unauthorized: invalid credentials
          return of(false);
        } else {
          // Re-throw other errors for further handling
          throw error;
        }
      })
    );
  }

  /**
   * Logs the user out by calling the logout API and clearing local state.
   */
  logout(): Observable<void> {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      return of(void 0); // No token, nothing to do
    }

    const url = environment.loginAPI;
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });

    return this.http.delete<void>(url, { headers }).pipe(
      tap(() => {
        // Clear local state
        localStorage.removeItem('auth_token');
        this.isAuthenticated = false;
        this.userName = null;
      }),
      catchError((error) => {
        console.error('Logout failed', error);
        return of(void 0); // Ignore errors
      })
    );
  }

  /**
   * Checks if the user is authenticated by validating the token.
   */
  checkAuthentication(): Observable<boolean> {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      // If no token exists, return an observable of false
      this.isAuthenticated = false;
      this.userName = null;
      return of(false);
    }

    const url = environment.loginAPI;
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });

    return this.http.get<{ username: string }>(url, { headers }).pipe(
      map((response) => {
        // If authenticated, set state and return true
        this.isAuthenticated = true;
        this.userName = response.username;
        return true;
      }),
      catchError((error) => {
        console.error('Authentication failed', error);
        // On error, reset state and return false
        this.isAuthenticated = false;
        this.userName = null;
        return of(false);
      })
    );
  }

  /**
   * Returns the current authentication status.
   */
  getAuthStatus(): boolean {
    return this.isAuthenticated;
  }

  /**
   * Returns the authenticated user's name.
   */
  getUserName(): string | null {
    return this.userName;
  }
}
