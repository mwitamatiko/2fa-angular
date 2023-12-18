import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { MaterialModule } from './material.module';
import { AuthenticationService } from './services/authentication.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './pages/header/header.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { OperatorComponent } from './pages/operator/operator.component';
import { UserComponent } from './pages/user/user.component';
import { AuthInterceptor } from './services/auth/interceptor';
import { UserAuthService } from './services/user-auth.service';
import { authGuard } from './services/auth/auth.guard';
import { ViewUsersComponent } from './pages/admin/view-users/view-users.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    AdminComponent,
    HomeComponent,
    OperatorComponent,
    UserComponent,
    HeaderComponent,
    ForbiddenComponent,
    ViewUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
