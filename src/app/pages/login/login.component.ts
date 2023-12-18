import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationRequest } from 'src/app/models/authentication-request';
import { AuthenticationResponse } from 'src/app/models/authentication-response';
import { VerificationRequest } from 'src/app/models/verification-request';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  authRequest: AuthenticationRequest = {}
  otpCode = ''
  authResponse: AuthenticationResponse = {}


  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private userAuthService: UserAuthService
  ){

  }

 

  authenticate(){
    this.authService.login(this.authRequest).subscribe(
      (response)=>{
        // console.log('authenticate response: ',response)
        console.log("accesstoken: ",response.accessToken)
        console.log("role: ",response.role)
        this.authResponse=response
        
        if(!this.authResponse.mfaEnabled){
            //store token
            // localStorage.setItem('token',response.accessToken as string)
            this.userAuthService.setRoles(response.role)
            this.userAuthService.setToken(response.accessToken!)

            const roleresponse = response.role
            console.log("roleresponse",roleresponse)
            if(roleresponse==='ADMIN'){
              this.router.navigate(['admin'])
            }
            if(roleresponse==='OPERATOR'){
              this.router.navigate(['operator'])
            }
            if(roleresponse==='USER'){
              this.router.navigate(['user'])
            }
      
        }

      },(error)=>{
          console.log(error)
      }
    )
  }

  verifyCode(){

    const verifyRequest: VerificationRequest = {
      email: this.authRequest.email,
      code: this.otpCode
    }

    this.authService.verifyCode(verifyRequest)
    .subscribe({
      next: (response)=>{
        console.log("user details",response)
          //store token
          // localStorage.setItem('token',response.accessToken as string)
          // this.router.navigate(['welcome'])

           //store token
            // localStorage.setItem('token',response.accessToken as string)
            this.userAuthService.setRoles(response.role)
            this.userAuthService.setToken(response.accessToken!)

            const roleresponse = response.role
            console.log("roleresponse",roleresponse)
            if(roleresponse==='ADMIN'){
              this.router.navigate(['admin'])
            }
            if(roleresponse==='OPERATOR'){
              this.router.navigate(['operator'])
            }
            if(roleresponse==='USER'){
              this.router.navigate(['user'])
            }
    
      }
    })

  }

}
