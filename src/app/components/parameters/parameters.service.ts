import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Parameter } from './models/parameter';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParametersService {

  parameters:Parameter[]
  constructor(private http: HttpClient) { }

  getParameters(): Observable<Parameter[]> {//endPoint
    var response=this.http.get<Parameter[]>(`${environment.urlLocal}parameter`);
    return response;
  }

}
