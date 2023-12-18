import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationResponse } from 'src/app/models/authentication-response';
import { RegisterRequest } from 'src/app/models/register-request';
import { VerificationRequest } from 'src/app/models/verification-request';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  registerRequest: RegisterRequest = {}
  authResponse: AuthenticationResponse = {}
  message = ''
  otpCode = ''
  // DEFAULT_ROLE = new Array('USER');
  DEFAULT_ROLE = 'USER'
  



  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private userAuthService: UserAuthService
  ){}
  ngOnInit(){
    // this.registerUser()
    // this.verify2fa()
  }


  registerUser(){

    this.message = ''
    this.authService.register(this.registerRequest)
    .subscribe(
      (response)=>{
        // console.log("accesstoken: ",response.accessToken)
        // console.log("role: ",response.role)
        if(response){
          this.authResponse=response
        }else{
          //inform the user that the account was successfully created
          this.message = 'Account created successfully\nyou will be redirected to QR-CODE page in 2seconds'
          setTimeout(()=>{
            this.router.navigate(['login'])
          },2000)
        }
      }
    )

  }

  verify2fa(){
    this.message=''

    const verifyRequest: VerificationRequest = {
      email: this.registerRequest.email,
      code: this.otpCode
    }

    this.authService.verifyCode(verifyRequest)
    .subscribe({
      next: (response)=>{
        console.log('user details response: ',response)
        this.message='Account created successfully\nyou will be redirected to welcome page in 2seconds'
        setTimeout(()=>{
          //store token
          // localStorage.setItem('token',response.accessToken as string)
          this.userAuthService.setRoles(this.DEFAULT_ROLE)
          // this.userAuthService.setToken(response.accessToken!)
          localStorage.setItem('token',response.accessToken as string)
          this.router.navigate(['user'])
        },2000)
      }
    })
  }




}
