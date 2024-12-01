import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductCardDisplayComponent } from './components/product-card-display/product-card-display.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { PasswordResetComponent } from './pages/auth/password-reset/password-reset.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { NewProductFormComponent } from './components/new-product-form/new-product-form.component';
import { ChangePasswordFormComponent } from './components/change-password-form/change-password-form.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductBigCardDisplayComponent } from './components/product-big-card-display/product-big-card-display.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    HomeComponent,
    ProductCardDisplayComponent,
    LoginComponent,
    ForgotPasswordComponent,
    RegisterComponent,
    PasswordResetComponent,
    UserProfileComponent,
    NewProductFormComponent,
    ChangePasswordFormComponent,
    ProductDetailComponent,
    ProductBigCardDisplayComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
