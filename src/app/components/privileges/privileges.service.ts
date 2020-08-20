import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { privilege } from './models/privilege';
import { environment } from '../../../environments/environment';
import { privilegeDTO } from './models/privilegeDTO';
import * as _ from 'lodash';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PrivilegesService {
  id;
  privilegeList:any
  constructor(private http: HttpClient) { }
  
  
  getPrivileges(): Observable<privilege[]> {//endPoint
    var response=this.http.get<privilege[]>(`${environment.urlLocal}privilegio`);
    this.privilegeList=response
    return response;
  }

  getPrivilegesByIdUser(): Observable<privilegeDTO[]>{
    var obj=JSON.parse(localStorage.getItem('authStatus'))
      this.id=obj.primarysid;
    return this.http.get<privilegeDTO[]>(`${environment.urlLocal}privilegio/detail/${this.id}`)
    .pipe(
      map((response:any)=>response)
    );
  }

  getTreeView(): Observable<privilegeDTO[]>{
    return this.http.get<privilegeDTO[]>(`${environment.urlLocal}seccionModeloAccion`)
    .pipe(
      map((response:any)=>response)
    );
  }

}
