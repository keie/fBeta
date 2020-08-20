import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './models/user';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import {FormGroup,FormControl,Validators} from "@angular/forms";
import { map, catchError } from 'rxjs/operators';
import * as _ from 'lodash';
import { Planta } from '../plantas/models/planta';
import { Register } from './models/register';
import { GetUserResponseDTO } from './models/getUserResponseDTO';
import { UserResponseDTO } from './models/userResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userList:any
  constructor(private http: HttpClient) { }
  form:FormGroup=new FormGroup({
    iIdUsuario:new FormControl(null),
    sNombre:new FormControl('',Validators.required),
    sApellido:new FormControl('',Validators.required),
    sTelefono:new FormControl('',Validators.required),
    sMovil:new FormControl('',Validators.required),
    sEmail:new FormControl('',Validators.email),
    sPlanta:new FormControl(''),
    iSuperAdmin:new FormControl(0),
    iRecibirNotificaciones:new FormControl(0),
    sEstado:new FormControl(0),
    sUsuario:new FormControl('',Validators.required),
    sClave:new FormControl(''),
  });

  initializeFormGroup(){
    this.form.setValue({
      iIdUsuario:null,
      sNombre:'',
      sApellido:'',
      sTelefono:'',
      sMovil:'',
      sEmail:'',
      sPlanta:'',
      iSuperAdmin:'',
      iRecibirNotificaciones:'',
      sEstado:'',
      sUsuario:'',
      sClave:''
    });
  }

  getUserList(): Observable<UserResponseDTO[]> {//endPoint
    var response=this.http.get<UserResponseDTO[]>(`${environment.urlLocal}User`);
    this.userList=response
    return response;
  }

  insertUser(data:Register): Observable<Response>{
    var objUser=JSON.parse(localStorage.getItem('authStatus'))
    var id=objUser.primarysid;
    data.user.sUsuarioC=id
    data.user.sEstado="ACTIVO";
    data.user.sClave=data.user.sUsuario;
    var json={
      "user":data.user,
      "plantas":data.plantas,
      "privilegios":data.privilegios
      }
     
    return this.http.post(`${environment.urlLocal}registerUser/insert`,json)
    .pipe(
      map((response:any)=>response)
    );
  }
  updateUser(data:Register): Observable<Response>{
    
    var objUser=JSON.parse(localStorage.getItem('authStatus'))
    var id=objUser.primarysid;
    data.user.sUsuarioM=id
    data.user.sEstado="ACTIVO";
    var json={
      "user":data.user,
      "plantas":data.plantas,
      "privilegios":data.privilegios
      }
    return this.http.put(`${environment.urlLocal}registerUser/update`,json)
    .pipe(
      map((response:any)=>response)
    );
  }

  populateForm(data){
    this.form.setValue({
      iIdUsuario:data.iIdUsuario,
      sNombre:data.sNombre,
      sApellido:data.sApellido,
      sTelefono:data.sTelefono,
      sMovil:data.sMovil,
      sEmail:data.sEmail,
      sPlanta:data.sPlanta,
      iSuperAdmin:data.iSuperAdmin,
      iRecibirNotificaciones:data.iRecibirNotificaciones,
      sEstado:data.sEstado,
      sUsuario:data.sUsuario,
      sClave:data.sClave
     
    });
  }

  deleteUser(data): Observable<Response>{
    return this.http.delete(`${environment.urlLocal}User/delete/${data}`)
    .pipe(
      map((response:any)=>response)
    );
  }

  getFullUserDetail(data): Observable<GetUserResponseDTO> {//endPoint
    var response=this.http.get<GetUserResponseDTO>(`${environment.urlLocal}registerUser/user/${data}`);
    this.userList=response
    return response;
  }
}
