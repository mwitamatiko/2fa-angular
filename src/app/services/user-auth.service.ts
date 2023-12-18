import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

//communicate with localstorage
export class UserAuthService {

  constructor() { }


  setRoles(roles: string){
    localStorage.setItem('role',JSON.stringify(roles))
  }

  getRoles(): [] {
    const rolesString = localStorage.getItem('role');

    // Use type assertion to inform TypeScript about the type
    return rolesString ? JSON.parse(rolesString) : [];
  }

  setToken(accessToken:string){
    localStorage.setItem('token',accessToken)
  }

  getToken(): string {
    const token: string | null = localStorage.getItem('token');

    // Use a null check to ensure a string return
    return token ? token : ''; 
  }

  clear(){
    localStorage.clear()
  }

  //return true/false if user is logged in
  //if roles and token is present in localstorage --> loggedin else otherwise
  isLoggedIn(){
    return this.getRoles() && this.getToken()
  }

  

}
