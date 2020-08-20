import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Access } from './models/access';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import {FormGroup,FormControl,Validators} from "@angular/forms";
import { map, catchError } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  accessList:any
  constructor(private http: HttpClient) { }




  getAccessList(): Observable<Access[]> {//endPoint
    var response=this.http.get<Access[]>(`${environment.urlLocal}access`);
    this.accessList=response
    return response;
  }

  insertAccess(data:Access): Observable<Response>{
    var json={
      "sUsuario" : data.sUsuario,
      "sIp" : data.sIp,
      "sNavigator" : data.sNavigator,
      "sOrigen" : data.sOrigen,
      "dtFecha":data.dtFecha,
      "sAccion" : data.sAccion
    }
    return this.http.post(`${environment.urlLocal}access/insert`,json)
    .pipe(
      map((response:any)=>response)
    );
  }
}
