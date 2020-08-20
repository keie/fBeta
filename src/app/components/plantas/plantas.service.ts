import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Planta } from './models/planta';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlantasService {

  constructor(private http: HttpClient) { }

  getPlantas(): Observable<Planta[]> {//endPoint
    var response=this.http.get<Planta[]>(`${environment.urlLocal}planta`);
    return response;
  }

}
