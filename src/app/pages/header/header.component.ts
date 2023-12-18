import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private authService: AuthenticationService
    ){}


isLoggedIn(){
  return this.userAuthService.isLoggedIn()
}

logout(){
  this.userAuthService.clear()
  this.router.navigate(['home'])
}

// Expose a public method that uses the authService's roleMatch method
public checkRoleMatch(allowedRoles: string[]): boolean {
  return this.authService.roleMatch(allowedRoles);
}

}
