import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { authGuard } from './services/auth/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { OperatorComponent } from './pages/operator/operator.component';
import { UserComponent } from './pages/user/user.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { ViewUsersComponent } from './pages/admin/view-users/view-users.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard],data:{role:'ADMIN'},
    // children:[
    //   {
    //     path: 'viewusers',
    //     component: ViewUsersComponent
    //   },
    // ]
  },
  {
    path: 'viewusers',
    component: ViewUsersComponent
  },
  {
    path: 'operator',
    component: OperatorComponent,
    canActivate: [authGuard],data:{role:'OPERATOR'}
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [authGuard],data:{role:'USER'}
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
    
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent
  }

];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
