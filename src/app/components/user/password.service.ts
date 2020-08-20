import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PasswordReestablish } from './models/passwordReestablish';
import { ChangePassword } from './models/changePassword';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import {FormGroup,FormControl,Validators} from "@angular/forms";
import { map, catchError } from 'rxjs/operators';
import * as _ from 'lodash';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  userList:any
  constructor(private http: HttpClient) { }
  form:FormGroup=new FormGroup({
    iIdUsuario:new FormControl(0),
    sUsuario:new FormControl(''),
    sClaveOld:new FormControl('',Validators.minLength(8)),
    sClaveNew:new FormControl('',Validators.minLength(8)),
    sClaveConfirm: new FormControl('',Validators.minLength(8)),
  });

  initializeFormGroup(){
    this.form.setValue({
      sClaveOld:'',
      sClasClaveNew:'',
      sClaveConfirm: '',
      iIdUsuario: 0,
      sUsuario: ''
    });
  }

  PasswordReestablish(data:any): Observable<Response>{
    
    var objUser=JSON.parse(localStorage.getItem('authStatus'))
    var id=objUser.primarysid;
    var json={
      "sUsuarioE":id.toString(),
      "iIdUsuario":parseInt(data),
      "sUsuarioR":"",
      "dtFechaM":"2020-07-13T08:44:38.613"
    }
    return this.http.put(`${environment.urlLocal}User/reestablishPassword`,json)
    .pipe(
      map((response:any)=>response)
    );
  }
  
  ChangePassword(data:ChangePassword): Observable<Response>{
    
    var json={
      "sClave":data.sClave,
      "sClaveOld":data.sClaveOld,
      "sUsuario":data.sUsuario,
      "dtFechaM":"2020-07-13T08:44:38.613",
      "iIdUsuario":parseInt(data.iIdUsuario)
    }
    return this.http.put(`${environment.urlLocal}User/passwordChange`,json)
    .pipe(
      map((response:any)=>response)
    );
  }

  populateUser(data){
    this.form.setValue({
      iIdUsuario:data.iIdUsuario,
      sUsuario:data.sUsuario,
      sClaveOld:data.sUsuario,
      sClaveNew:data.sUsuario,
      sClaveConfirm: data.sUsuario,
     
    });
  }

}
