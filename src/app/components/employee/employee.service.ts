import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './models/employee';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import {FormGroup,FormControl,Validators} from "@angular/forms";
import { map, catchError } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  userList:any
  constructor(private http: HttpClient) { }
  form:FormGroup=new FormGroup({
    iId:new FormControl(null),
    sCodigoSAP: new FormControl(''), 
    sPlanillaCPS:new FormControl(''),
    sNombre:new FormControl('',Validators.required),
    sApellido:new FormControl('',Validators.required),
    sCentroCoste: new FormControl(''),
    sDenonCentro: new FormControl(''),
    sDescUnidadOrganizativa: new FormControl(''),
    sSociedad: new FormControl(''),
    sFamiliaCargo: new FormControl(''),
    sCargo: new FormControl(''),
    sSeguridadSocial: new FormControl(''),
    dFechaIngreso: new FormControl(''),
    sCI: new FormControl(''),
    sExpCI: new FormControl(''),
    dFechaNacimiento: new FormControl(''),
    sSexo: new FormControl(''),
    sEmail:new FormControl(''),
    sPIN:new FormControl(''),
    sFechaPIN:new FormControl(''),



    sNroTelf:new FormControl('',Validators.required),
    sNroCelular:new FormControl('',Validators.required),
    
    iIdPlanta:new FormControl(0),
    iSuperUsuario:new FormControl(0),
    iNotificaciones:new FormControl(0),
    iEstado:new FormControl(0),
    sUsername:new FormControl('',Validators.required),
    sPassword:new FormControl('',Validators.required),
  });

  initializeFormGroup(){
    this.form.setValue({
      iId:null,
      sCodigoSAP: '',
      sPlanillaCPS: '',
      sNombre:'',
      sApellido:'',
      sCentroCoste: '',
      sDenomCentro: '',
      sDescUnidadOrganizativa:'',
      sSociedad:'',
      sFamiliaCargo:'',
      sCargo:'',
      sSeguridadSocial:'',
      dFechaIngreso:'',
      sCI: '',
      sExpCI: '',
      dFechaNacimiento: '',
      sSexo: '',
      sEmail:'',
      sPIN:'',
      sFechaPIN: '',


      sNroTelf:'',
      sNroCelular:'',
      
      iIdPlanta:'',
      iSuperUsuario:'',
      iNotificaciones:'',
      iEstado:'',
      sUsername:'',
      sPassword:''
    });
  }

  getUserList(): Observable<User[]> {//endPoint
    var response=this.http.get<User[]>(`${environment.urlLocal}User`);
    this.userList=response
    return response;
  }

  insertUser(data:User): Observable<Response>{
    
    var json={
      "sNombre":data.sNombre,
      "sApellido":data.sApellido,
      "sNroTelf":data.sNroTelf,
      "sNroCelular":data.sNroCelular,
      "sEmail":data.sEmail,
      "iIdPlanta":parseInt(data.iIdPlanta),
      "iSuperUsuario":parseInt(data.iSuperUsuario),
      "iNotificaciones":parseInt(data.iNotificaciones),
      "iEstado":1,
      "sUsername":data.sUsername,
      "sPassword":data.sPassword,
      "iBoolDelete":0
      
      
    }
    return this.http.post(`${environment.urlLocal}User/insert`,json)
    .pipe(
      map((response:any)=>response)
    );
  }
  updateUser(data:User): Observable<Response>{
    
    var json={
      "iId":data.iId,
      "sNombre":data.sNombre,
      "sApellido":data.sApellido,
      "sNroTelf":data.sNroTelf,
      "sNroCelular":data.sNroCelular,
      "sEmail":data.sEmail,
      "iIdPlanta":parseInt(data.iIdPlanta),
      "iSuperUsuario":parseInt(data.iSuperUsuario),
      "iNotificaciones":parseInt(data.iNotificaciones),
      "iEstado":parseInt(data.iEstado),
      "sUsername":data.sUsername,
      "sPassword":data.sPassword,
      "iBoolDelete":0
      
      
    }
    return this.http.put(`${environment.urlLocal}User/update`,json)
    .pipe(
      map((response:any)=>response)
    );
  }

  populateForm(data){
    this.form.setValue({
      iId:data.iId,
      sNombre:data.sNombre,
      sApellido:data.sApellido,
      sNroTelf:data.sNroTelf,
      sNroCelular:data.sNroCelular,
      sEmail:data.sEmail,
      iIdPlanta:data.iIdPlanta,
      iSuperUsuario:data.iSuperUsuario,
      iNotificaciones:data.iNotificaciones,
      iEstado:data.iEstado,
      sUsername:data.sUsername,
      sPassword:data.sPassword
     
    });
  }

  deleteUser(data): Observable<Response>{
    return this.http.delete(`${environment.urlLocal}User/delete/${data}`)
    .pipe(
      map((response:any)=>response)
    );
  }

}
