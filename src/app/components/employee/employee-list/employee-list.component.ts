import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { NotificationService } from '../../notification/notification.service';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../models/employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'employee-user-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  users: User[] = [];
  //displayedColumns: string[] = ['actions','address', 'id','birthday','lastname', 'name','username','password'];
  displayedColumns: string[] = ['actions','CodEmpleado',"Planta", "CodPlanilla",'Nombre','Apellido','codCentroCosto',
  'CentroCosto', 'organizacion', 'sociedad', 'familiaCargo', 'cargo', 'seguridad', 'fechaIngreso', 'cedula', 'ciudadExp',
  'fechaNac', 'sexo', 'Email', 'asignacionPIN', 'fechaPIN'];
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator:MatPaginator
  isVisible= false;
  constructor(private userService:EmployeeService,
    private dialog: MatDialog,
    private notificationService:NotificationService) { }

    codigoFilter= new FormControl(); 
    plantaFilter=new FormControl();
    codPlanillaFilter=new FormControl();
    nombreFilter=new FormControl();
    apellidoFilter=new FormControl();
    codCentroFilter= new FormControl();
    CentroFilter= new FormControl();
    organizacionFilter = new FormControl();
    sociedadFilter = new FormControl();
    familiaCargoFilter = new FormControl();
    cargoFilter = new FormControl();
    seguridadFilter = new FormControl();
    fechaIngresoFilter = new FormControl();
    cedulaFilter = new FormControl();
    ciudadExpFilter = new FormControl();
    fechaNacFilter  = new FormControl();
    sexoFilter  = new FormControl();
    emailFilter=new FormControl();
    asignacionPINFilter=new FormControl();
    fechaPINFilter=new FormControl();


    filteredValues={sCodigoSAP:"", iIdPlanta:"",sPlanillaCPS:"",sNombre:"",sApellido:"",sCentroCoste:"",sDenonCentro:"" ,sNroTelf:"",
    sDescUnidadOrganizativa:"", sSociedad:"", sFamiliaCargo:"", sCargo:"", sSeguridadSocial:"", dFechaIngreso:"", sCI:"", sExpCI:"",
    dFechaNacimiento:"", sSexo:"", sPIN:"", dFechaPIN:"" }

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

    /* applyFilter() {
      
      this.codigoFilter.valueChanges.subscribe(codigoFilterValue=>{
        this.filteredValues['sCodigoSAP']=codigoFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
      this.plantaFilter.valueChanges.subscribe(plantaFilterValue=>{
        this.filteredValues['iIdPlanta']=plantaFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
      this.codPlanillaFilter.valueChanges.subscribe(codPlanillaFilterValue=>{
        this.filteredValues['sPlanillaCPS']=codPlanillaFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
      this.nombreFilter.valueChanges.subscribe(nombreFilterValue=>{
        this.filteredValues['sNombre']=nombreFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
      this.apellidoFilter.valueChanges.subscribe(apellidoFilterValue=>{
        this.filteredValues['sApellido']=apellidoFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
      this.codCentroFilter.valueChanges.subscribe(codCentroFilterValue=>{
        this.filteredValues['sCentroCoste']=codCentroFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
      this.CentroFilter.valueChanges.subscribe(CentroFilterValue=>{
        this.filteredValues['sDenomCentro']=CentroFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
      this.organizacionFilter.valueChanges.subscribe(organizacionFilterValue=>{
        this.filteredValues['sDescUnidadOrganizativa']=organizacionFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
      this.sociedadFilter.valueChanges.subscribe(sociedadFilterValue=>{
        this.filteredValues['sSociedad']=sociedadFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
      this.familiaCargoFilter.valueChanges.subscribe(familiaCargoFilterValue=>{
        this.filteredValues['sFamiliaCargo']=familiaCargoFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
      this.cargoFilter.valueChanges.subscribe(cargoFilterValue=>{
        this.filteredValues['sCargo']=cargoFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
      this.seguridadFilter.valueChanges.subscribe(seguridadFilterValue=>{
        this.filteredValues['sSeguridadSocial']=seguridadFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
      this.fechaIngresoFilter.valueChanges.subscribe(fechaIngresoFilterValue=>{
        this.filteredValues['dFechaIngreso']=fechaIngresoFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
      this.cedulaFilter.valueChanges.subscribe(cedulaFilterValue=>{
        this.filteredValues['sCI']=cedulaFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
      this.ciudadExpFilter.valueChanges.subscribe(ciudadExpFilterValue=>{
        this.filteredValues['sExpCI']=ciudadExpFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
      this.fechaNacFilter.valueChanges.subscribe(fechaNacFilterValue=>{
        this.filteredValues['dFechaNacimiento']=fechaNacFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
      this.sexoFilter.valueChanges.subscribe(sexoFilterValue=>{
        this.filteredValues['sSexo']=sexoFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
      this.emailFilter.valueChanges.subscribe(emailFilterValue=>{
        this.filteredValues['sEmail']=emailFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
      this.asignacionPINFilter.valueChanges.subscribe(asignacionPINFilterValue=>{
        this.filteredValues['sPIN']=asignacionPINFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
      this.fechaPINFilter.valueChanges.subscribe(fechaPINFilterValue=>{
        this.filteredValues['dFechaPIN']=fechaPINFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
        
      this.listData.filterPredicate=this.customFilterPredicate();
    }


     customFilterPredicate(){
      const myFilterPredicate=function(data:User,filter:string):boolean{
        let searchString=JSON.parse(filter);
        let sCodigoSAPFound=data.sCodigoSAP.toString().trim().indexOf(searchString.sCodigoSAP)!==-1
        let sPlanillaCPSFound=data.sPlanillaCPS.toString().trim().indexOf(searchString.sPlanillaCPS)!==-1
        let sNombreFound=data.sNombre.toString().trim().toLowerCase().indexOf(searchString.sNombre.toLowerCase())!==-1
        let sApellidoFound=data.sApellido.toString().trim().indexOf(searchString.sApellido)!==-1
        let sCentroCosteFound=data.sCentroCoste.toString().trim().indexOf(searchString.sCentroCoste)!==-1
        let sDenomCentroFound=data.sDenomCentro.toString().trim().indexOf(searchString.sDenomCentro)!==-1
        let sDescUnidadOrganizativaFound=data.sDescUnidadOrganizativa.toString().trim().indexOf(searchString.sDescUnidadOrganizativa)!==-1
        let sSociedadFound=data.sSociedad.toString().trim().indexOf(searchString.sSociedad)!==-1
        let sFamiliaCargoFound=data.sFamiliaCargo.toString().trim().indexOf(searchString.sFamiliaCargo)!==-1
        let sCargoFound=data.sCargo.toString().trim().indexOf(searchString.sCargo)!==-1
        let sSeguridadSocialFound=data.sSeguridadSocial.toString().trim().indexOf(searchString.sSeguridadSocial)!==-1
        let dFechaIngresoFound=data.dFechaIngreso.toString().trim().indexOf(searchString.dFechaIngreso)!==-1
        let sCIFound=data.sCI.toString().trim().indexOf(searchString.sCI)!==-1
        let sExpCIFound=data.sExpCI.toString().trim().indexOf(searchString.sExpCI)!==-1
        let dFechaNacimientoFound=data.dFechaNacimiento.toString().trim().indexOf(searchString.dFechaNacimiento)!==-1
        let sSexoFound=data.sSexo.toString().trim().indexOf(searchString.sSexo)!==-1
        let sEmailFound=data.sEmail.toString().trim().indexOf(searchString.sEmail)!==-1
        let sPINFound=data.sPIN.toString().trim().indexOf(searchString.sPIN)!==-1
        let dFechaPINFound=data.dFechaPIN.toString().trim().indexOf(searchString.sFechaPIN)!==-1

        

       
        
      if(searchString.topFilter){
        return sCodigoSAPFound || sPlanillaCPSFound || sNombreFound || sApellidoFound || sCentroCosteFound || 
        sDenomCentroFound || sDescUnidadOrganizativaFound || sSociedadFound || sFamiliaCargoFound ||
        sCargoFound || sSeguridadSocialFound || dFechaIngresoFound || sCIFound || sExpCIFound ||
        dFechaNacimientoFound || sSexoFound || sEmailFound || sPINFound || dFechaPINFound

      }else{
        return sCodigoSAPFound && sPlanillaCPSFound &&  sNombreFound && sApellidoFound && sCentroCosteFound && 
        sDenomCentroFound && sDescUnidadOrganizativaFound && sSociedadFound && sFamiliaCargoFound &&
        sCargoFound && sSeguridadSocialFound && sCIFound && sExpCIFound &&
        dFechaNacimientoFound && sSexoFound && sEmailFound  && sPINFound && dFechaPINFound
      
      }
      
      }
      return myFilterPredicate;
    }
 */


  ngOnInit(): void {
    //this.reload();
  } 

}
