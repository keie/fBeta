import { Injectable } from '@angular/core';
import { Roles } from './roles.enum';
import { Observable, BehaviorSubject, throwError as observableThrowError } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {map, catchError} from "rxjs/operators";
import * as decode from "jwt-decode";
import { transformError } from '../common/common';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService extends CacheService{

private readonly authProvider:(sUsername:string,sPassword:string)=>Observable<IServerAuthResponse>;
authStatus=new BehaviorSubject<IAuthStatus>(this.getItem('authStatus') || defaultAuthStatus); //listen changes about status

constructor(private httpClient:HttpClient) { 
  super();
  this.authStatus.subscribe(authStatus => {
      if ((typeof this.authStatus==='string')){
        var token= this.authStatus;
        this.setItem('authStatus',token);
      }else{
        var objJson={
          "role":this.authStatus.value.role,
          "unique_name":this.authStatus.value.unique_name,
          "primarysid":this.authStatus.value.primarysid
        }
        this.setItem('authStatus',objJson);
      }
    
  });
  this.authProvider=this.userAuthProvider;
}

private userAuthProvider(sUsuario:string,sClave:string):Observable<IServerAuthResponse>{
  return this.httpClient.post<IServerAuthResponse>(`${environment.urlLocal}token`,{sUsuario:sUsuario,sClave:sClave});
}//endpoint

login(sUsuario:string,sClave:string):Observable<IAuthStatus>{
  this.logout();
  const loginResponse=this.authProvider(sUsuario,sClave).pipe(
    map(value=>{
      console.log(value["objModel"] )
      if(value["objModel"] == null){
        this.setToken(value.access_Token);
        const result=decode(value.access_Token);
        return result as IAuthStatus
      }else if(value["objModel"] != null && value["objModel"].description === "Incorrect Data"){
        this.setToken(value.access_Token);
        const result=decode(value.access_Token);
        return result as IAuthStatus
      }else if(value["objModel"] != null){
        let result = value["objModel"]
        return result as IAuthStatus
      }
      
    }),
    catchError(transformError)
  );
  loginResponse.subscribe(
    res=>{
      globalData=res;
      //this.setItem('authStatus',res);
      this.authStatus.next(res);
    },
    err=>{
      this.logout();
      return observableThrowError(err);
    }
  )
  return loginResponse;
}

logout(){
  this.clearToken();
  this.authStatus.next(defaultAuthStatus);
}

private setToken(jwt:string){
  this.setItem('jwt',jwt);
}

getToken():string{
  return this.getItem('jwt') || '';
}

private clearToken(){
  this.removeItem('jwt');
}

getAuthStatus():IAuthStatus{
  return this.getItem('authStatus');
}




}
export interface IAuthStatus{
  role:Roles;
  primarysid:number;
  unique_name:string;

}
interface IServerAuthResponse{
  access_Token:string;
}

const defaultAuthStatus:IAuthStatus={role:Roles.none,primarysid:null,unique_name:null};
var globalData:IAuthStatus={role:Roles.none,primarysid:null,unique_name:null};
