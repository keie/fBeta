import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { NotificationService } from '../../notification/notification.service';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../models/grade';
import { GradeService } from '../grade.service';

@Component({
  selector: 'grade-user-list',
  templateUrl: './grade-list.component.html',
  styleUrls: ['./grade-list.component.css']
})
export class GradeListComponent implements OnInit {

  users: User[] = [];
  //displayedColumns: string[] = ['actions','address', 'id','birthday','lastname', 'name','username','password'];
  displayedColumns: string[] = ['actions','Nombre','Apellido','NroTelf', 
  'NroCell',"Email","Planta","SuperUser","Notifi","Edo","Usuario"];
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator:MatPaginator
  isVisible= false;
  constructor(private userService:GradeService,
    private dialog: MatDialog,
    private notificationService:NotificationService) { }

     nombreFilter=new FormControl();
    apellidoFilter=new FormControl();
    nroTelfFilter=new FormControl();
    nroCellFilter=new FormControl();
    emailFilter=new FormControl();
    plantaFilter=new FormControl();
    superUserFilter=new FormControl();
    notifFilter=new FormControl();
    edoFilter=new FormControl();
    userFilter=new FormControl();

    filteredValues={sNombre:"",sApellido:"",sNroTelf:"",sNroCelular:"",sEmail:"",iIdPlanta:"",iSuperUsuario:"",iNotificaciones:"",
    iEstado:"",sUsername:""}

    listData:MatTableDataSource<any>;

    reload(){
      this.isVisible=true;
      this.userService.getUserList().subscribe(
        list=>{
          let array=list.map(item=>{
            if(item.iBoolDelete!=1 ){
              return{
                iId:item.iId,
                sNombre:item.sNombre,
                sApellido:item.sApellido,
                sNroTelf:item.sNroTelf,
                sNroCelular:item.sNroCelular,
                sEmail:item.sEmail,
                iIdPlanta:item.iIdPlanta,
                iSuperUsuario:item.iSuperUsuario,
                iNotificaciones:item.iNotificaciones,
                iEstado:item.iEstado,
                sUsername:item.sUsername,
                sPassword:item.sPassword
              };
            }
          });
          array = array.filter(function(dato){
            return dato != undefined
          });
          this.listData=new MatTableDataSource(array);
          this.listData.sort=this.sort;
          this.listData.paginator=this.paginator;
          this.isVisible=false;
        });
    }

    applyFilter() {
      
      this.nombreFilter.valueChanges.subscribe(nombreFilterValue=>{
        this.filteredValues['sNombre']=nombreFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
      this.apellidoFilter.valueChanges.subscribe(apellidoFilterValue=>{
        this.filteredValues['sApellido']=apellidoFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
      this.nroTelfFilter.valueChanges.subscribe(nroTelfFilterValue=>{
        this.filteredValues['sNroTelf']=nroTelfFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
      this.nroCellFilter.valueChanges.subscribe(nroCellFilterValue=>{
        this.filteredValues['sNroCelular']=nroCellFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
      this.emailFilter.valueChanges.subscribe(emailFilterValue=>{
        this.filteredValues['sEmail']=emailFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
      this.plantaFilter.valueChanges.subscribe(plantaFilterValue=>{
        this.filteredValues['iIdPlanta']=plantaFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
      
      this.superUserFilter.valueChanges.subscribe(iSuperUsuarioValue=>{
        this.filteredValues['iSuperUsuario']=iSuperUsuarioValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })

      this.notifFilter.valueChanges.subscribe(notifFilterValue=>{
        this.filteredValues['iNotificaciones']=notifFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
      
      this.edoFilter.valueChanges.subscribe(edoFilterValue=>{
        this.filteredValues['iEstado']=edoFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
      this.userFilter.valueChanges.subscribe(userFilterValue=>{
        this.filteredValues['sUsername']=userFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
  
      this.listData.filterPredicate=this.customFilterPredicate();
    }


    customFilterPredicate(){
      const myFilterPredicate=function(data:User,filter:string):boolean{
        let searchString=JSON.parse(filter);
        let sNombreFound=data.sNombre.toString().trim().toLowerCase().indexOf(searchString.sNombre.toLowerCase())!==-1
        let sApellidoFound=data.sApellido.toString().trim().indexOf(searchString.sApellido)!==-1
        let sNroTelfFound=data.sNroTelf.toString().trim().indexOf(searchString.sNroTelf)!==-1
        let sNroCelularFound=data.sNroCelular.toString().trim().indexOf(searchString.sNroCelular)!==-1
        let sEmailFound=data.sEmail.toString().trim().indexOf(searchString.sEmail)!==-1
        let iIdPlantaFound=data.iIdPlanta.toString().trim().indexOf(searchString.iIdPlanta)!==-1
        let iSuperUsuarioFound=data.iSuperUsuario.toString().trim().indexOf(searchString.iSuperUsuario)!==-1
        let iNotificacionesFound=data.iNotificaciones.toString().trim().indexOf(searchString.iNotificaciones)!==-1
        let iEstadoFound=data.iEstado.toString().trim().indexOf(searchString.iEstado)!==-1
        let sUsernameFound=data.sUsername.toString().trim().indexOf(searchString.sUsername)!==-1
        
      if(searchString.topFilter){
        return sNombreFound || sApellidoFound || sNroTelfFound || 
        sNroCelularFound || sEmailFound || iIdPlantaFound || iSuperUsuarioFound || iNotificacionesFound || iEstadoFound  || sUsernameFound
      }else{
        return sNombreFound && sApellidoFound && sNroTelfFound && sNroCelularFound &&  sEmailFound  &&  iIdPlantaFound && iSuperUsuarioFound 
        && iNotificacionesFound && iEstadoFound && sUsernameFound
      }
      
      }
      return myFilterPredicate;
    }/**/



  ngOnInit(): void {
    this.reload();
  } 

}
