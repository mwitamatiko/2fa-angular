import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest } from '../models/register-request';
import { AuthenticationResponse } from '../models/authentication-response';
import { VerificationRequest } from '../models/verification-request';
import { AuthenticationRequest } from '../models/authentication-request';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = 'http://localhost:8080'
  

  constructor(
    private http: HttpClient,
    private userAuthService: UserAuthService
  ) { }

  // requestHeader = new HttpHeaders(
  //   {"No-Auth":"True"}
  // )


    viewAllUsers(){
      return this.http.get(`${this.baseUrl}/api/v1/admin`)
    }














  register(registerRequest: RegisterRequest ){
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/api/v1/auth/register`,registerRequest)
  }

  login(authRequest: AuthenticationRequest){
    console.log('authentication request: ',authRequest)
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/api/v1/auth/authenticate`,authRequest)
  }

  verifyCode(verificationRequest: VerificationRequest){
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/api/v1/auth/verify`,verificationRequest)
   
  }

  logout(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
      })
    };

    return this.http.post<any>(`${this.baseUrl}/api/v1/auth/logout`, null, httpOptions);
  }

  // logout(){
  //   return this.http.post<any>(`${this.baseUrl}/logout`,null)
  // }

  //check the role being passed matches the user
 roleMatch(allowedRoles: string[]): boolean {
  let isMatch = false;
  const userRoles = this.userAuthService.getRoles();

  if (userRoles && userRoles.length > 0) {
    for (let i = 0; i < userRoles.length; i++) {
      for (let j = 0; j < allowedRoles.length; j++) {
        // Assuming userRoles and allowedRoles are arrays of strings
        if (userRoles[i] === allowedRoles[j]) {
          isMatch = true;
          return isMatch;
        }
      }
    }
  }
  return isMatch;
}

}
