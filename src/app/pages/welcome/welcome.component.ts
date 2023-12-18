import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationResponse } from 'src/app/models/authentication-response';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  object: any
  authResponse: AuthenticationResponse = {}


  constructor(
    private authService: AuthenticationService,
    private router: Router
  ){

  }


  // signout(){

  //   this.authService.logout()
  //   .subscribe({
  //     next: (response)=>{
        
  //         this.router.navigate(['login'])
  //         //remove token
  //         localStorage.removeItem('token');
  //     }
  //   })

  // }

  signout() {
    const storedToken = localStorage.getItem('token'); // Retrieve the stored token
    if (storedToken) {
      this.authService.logout(storedToken)
        .subscribe(
          (response) => {
            // Handle successful logout response here
            // Remove token from localStorage or perform any additional actions
            if(this.authResponse.mfaEnabled){
              localStorage.removeItem('token');
              this.router.navigate(['login'])
            }
            localStorage.removeItem('token');
            this.router.navigate(['login'])
          },
          (error) => {
            console.log("error",error)
          }
        );
    } else {
      // Token not found in localStorage
      // Handle the scenario accordingly
    }
  }

}
