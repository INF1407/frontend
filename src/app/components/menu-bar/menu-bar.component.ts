import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent implements OnInit {
  isAuthenticated = false;
  userName: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Check authentication status
    this.authService.checkAuthentication().subscribe((isAuth) => {
      this.isAuthenticated = isAuth;
      this.userName = this.authService.getUserName();
    });
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.isAuthenticated = false;
      this.userName = null;
    });
  }
}
