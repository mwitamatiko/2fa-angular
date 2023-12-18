import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserAuthService } from '../user-auth.service';
import { AuthenticationService } from '../authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
  

  const router = inject(Router)
  const userAuthService = inject(UserAuthService)
  const authService = inject(AuthenticationService)



  if(userAuthService.getToken() !==null){
    const role = route.data['role'] as Array<string>

    console.log("role", role)

    if(role){
     const match:boolean = authService.roleMatch(role)
     console.log("match", match)

     if(match){
      return true
     }else{
      router.navigate(['forbidden'])
      return false
     }
    }
  }

    router.navigate(['login'])
    return false
  
  // return true;
};

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(
//     private router: Router,
//     private userAuthService: UserAuthService,
//     private authService: AuthenticationService
//   ) {}

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//     const token = this.userAuthService.getToken();

//     if (token) {
//       const role = route.data?.['role'] as string[] | undefined;

//       if (role && role.length > 0) {
//         const isRoleMatch = this.authService.roleMatch(role);
        
//         if (isRoleMatch) {
//           return true;
//         } else {
//           this.router.navigate(['forbidden']);
//           return false;
//         }
//       }

//       return true; // No role defined in the route, allow access
//     }

//     this.router.navigate(['login']);
//     return false; // User not authenticated, deny access
//   }
// }