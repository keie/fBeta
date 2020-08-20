import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, IAuthStatus } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,CanActivateChild,CanLoad {
  protected currentAuthStatus:IAuthStatus;
  constructor(private authService:AuthService,private router:Router){
    this.authService.authStatus.subscribe(
      authStatus=>(this.currentAuthStatus=(this.authService.getAuthStatus()))
      
    );
  }
  
  canLoad(route:Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin();
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkPermissions(childRoute);
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.checkPermissions(next);
  }

  protected checkLogin(){
    if((this.authService.getToken()==null || this.authService.getToken()==='')){
      alert('you must login to continue');
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
  protected checkPermissions(route?:ActivatedRouteSnapshot){
    let roleMatch=false;
    let params:any;
    if(route){
      const expectedRole=route.data.expectedRole;
      if(expectedRole){
        var arrRole=JSON.parse(this.currentAuthStatus.role)
        arrRole.forEach(function (value) {
          if(value.Name===expectedRole)roleMatch=true;
      });
      }
    }
    if(!roleMatch){
      alert('You do not have permission to view this window');
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }

}
