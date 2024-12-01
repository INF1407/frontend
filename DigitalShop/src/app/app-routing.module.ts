import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { PasswordResetComponent } from './pages/auth/password-reset/password-reset.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { AuthGuard } from './guards/auth.guard'; // Import the guard

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'password-reset', component: PasswordResetComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  }, // Protect this route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
