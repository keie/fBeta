import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { NotificationService } from '../../notification/notification.service';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { UserRegisterComponent } from '../user-register/user-register.component';
import { UserViewComponent } from '../user-view/user-view.component';

import { Accion } from '../../accion/models/accion';
import { UserResponseDTO } from '../models/userResponseDTO';
import { PlantasService } from '../../plantas/plantas.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: UserResponseDTO[] = [];
  accion:Accion
  id:any
  displayedColumns: string[] = ['actions',"Usuario",'Nombre','Apellido','NroTelf', 
  'NroCell',"Email","Planta","SuperUser", "Acceso","Notifi","Edo"];
  
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator:MatPaginator
  isVisible= false;
 
  constructor(private userService:UserService,
    private dialog: MatDialog,
    private notificationService:NotificationService,
    public servicePlanta:PlantasService,) { }

    nombreFilter=new FormControl();
    apellidoFilter=new FormControl();
    nroTelfFilter=new FormControl();
    nroCellFilter=new FormControl();
    emailFilter=new FormControl();
    plantaFilter=new FormControl();
    superUserFilter=new FormControl();
    notifFilter=new FormControl();
    accesoFilter=new FormControl();
    edoFilter=new FormControl();
    userFilter=new FormControl();

    filteredValues={sNombre:"",sApellido:"",sTelefono:"",sMovil:"",sEmail:"",sPlanta:"",iSuperAdmin:"",iRecibirNotificaciones:"",
    sEstado:"",sUsuario:""}

    accionAttr={sNombre:"",sIconClass:"",sIconPath:"",sEstado:""}
    //permisos//
    boolModificar=false;
    boolCrear=false;
    boolEliminar=false;
    boolVisualizar=false;
    ///////////
    //iconos//
    sModificar:any
    sEliminar:any
    sCrear:any
    sVisualizar:any
    ////
    listData:MatTableDataSource<any>;
    listPlantas: any = []

    getPlantas(){
      this.servicePlanta.getPlantas().subscribe(
        list=>{
          let array=list['objModel'].map(item=>{
            if(item.sEstado=="ACTIVO"  ){
              return{
                sCodigo:item.sCodigo,
                sNombre:item.sNombre,
                sEstado:item.sEstado
              };
            }
          });
          array = array.filter(function(dato){
            return dato != undefined
          });
           this.listPlantas = array;
        });
        
    }
    
    getPrivilegioCrear(){
      var resp=false;
      var privilegios = JSON.parse(localStorage.getItem("privilegios"));
      privilegios.forEach(function (seccion) {
       seccion.modelos.forEach(function (modelo) {
         if(modelo.sNombre=="Usuarios"){
           modelo.acciones.forEach(function(accion){
             if(accion.sNombre=="Crear"){
              resp=true;
            
            }
          });
         }
       });
     });
     return resp;
    }

    getPrivilegioModificar(){
      var resp=false;
      var privilegios = JSON.parse(localStorage.getItem("privilegios"));
      privilegios.forEach(function (seccion) {
       seccion.modelos.forEach(function (modelo) {
         if(modelo.sNombre=="Usuarios"){
           modelo.acciones.forEach(function(accion){
             if(accion.sNombre=="Modificar"){
              resp=true;
            }
          });
         }
       });
     });
     return resp;
   }

   getPrivilegioModificarIcon(){
    var resp="";
    var privilegios = JSON.parse(localStorage.getItem("privilegios"));
    privilegios.forEach(function (seccion) {
     seccion.modelos.forEach(function (modelo) {
       if(modelo.sNombre=="Usuarios"){
         modelo.acciones.forEach(function(accion){
           if(accion.sNombre=="Modificar"){
            resp=accion.sIconClass;
          }
        });
       }
     });
   });
   return resp;
 }

 getPrivilegioEliminarIcon(){
  var resp="";
  var privilegios = JSON.parse(localStorage.getItem("privilegios"));
  privilegios.forEach(function (seccion) {
   seccion.modelos.forEach(function (modelo) {
     if(modelo.sNombre=="Usuarios"){
       modelo.acciones.forEach(function(accion){
         if(accion.sNombre=="Eliminar"){
          resp=accion.sIconClass;
        }
      });
     }
   });
 });
 return resp;
}


getPrivilegioCrearIcon(){
  var resp="";
  var privilegios = JSON.parse(localStorage.getItem("privilegios"));
  privilegios.forEach(function (seccion) {
   seccion.modelos.forEach(function (modelo) {
     if(modelo.sNombre=="Usuarios"){
       modelo.acciones.forEach(function(accion){
         if(accion.sNombre=="Crear"){
          resp=accion.sIconClass;
        }
      });
     }
   });
 });
 return resp;
}



   getPrivilegioEliminar(){
    var resp=false;
    var privilegios = JSON.parse(localStorage.getItem("privilegios"));
    privilegios.forEach(function (seccion) {
     seccion.modelos.forEach(function (modelo) {
       if(modelo.sNombre=="Usuarios"){
         modelo.acciones.forEach(function(accion){
           if(accion.sNombre=="Eliminar"){
            resp=true;
          }
        });
       }
     });
   });
   return resp;
 }

 getPrivilegioVisualizar(){
  var resp=false;
  var privilegios = JSON.parse(localStorage.getItem("privilegios"));
  privilegios.forEach(function (seccion) {
   seccion.modelos.forEach(function (modelo) {
     if(modelo.sNombre=="Usuarios"){
       modelo.acciones.forEach(function(accion){
         if(accion.sNombre=="Visualizar"){
          resp=true;
        }
      });
     }
   });
 });
 return resp;
}

getPrivilegioVisualizarIcon(){
  var resp="";
  var privilegios = JSON.parse(localStorage.getItem("privilegios"));
  privilegios.forEach(function (seccion) {
   seccion.modelos.forEach(function (modelo) {
     if(modelo.sNombre=="Usuarios"){
       modelo.acciones.forEach(function(accion){
         if(accion.sNombre=="Visualizar"){
          resp=accion.sIconClass;
        }
      });
     }
   });
 });
 return resp;
}
   
    reload(){
      var obj=JSON.parse(localStorage.getItem('authStatus'))
      this.id=obj.primarysid;
      this.isVisible=true;
      this.userService.getUserList().subscribe(
        list=>{
          let array=list['objModel'].map(item=>{
            if(item.sEstado=="ACTIVO" ){
              return{
                iIdUsuario:item.iIdUsuario,
                sNombre:item.sNombre,
                sApellido:item.sApellido,
                sTelefono:item.sTelefono,
                sMovil:item.sMovil,
                sEmail:item.sEmail,
                sPlanta:item.sPlanta,
                iSuperAdmin:item.iSuperAdmin,
                iRecibirNotificaciones:item.iRecibirNotificaciones,
                sEstado:item.sEstado,
                sUsuario:item.sUsuario,
                sClave:item.sClave,
                dtAcceso:item.dtAcceso
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
        this.filteredValues['sTelefono']=nroTelfFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
      this.nroCellFilter.valueChanges.subscribe(nroCellFilterValue=>{
        this.filteredValues['sMovil']=nroCellFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
      this.emailFilter.valueChanges.subscribe(emailFilterValue=>{
        this.filteredValues['sEmail']=emailFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
      this.plantaFilter.valueChanges.subscribe(plantaFilterValue=>{
        this.filteredValues['sPlanta']=plantaFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
      
      this.superUserFilter.valueChanges.subscribe(iSuperUsuarioValue=>{
        this.filteredValues['iSuperAdmin']=iSuperUsuarioValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })

      this.notifFilter.valueChanges.subscribe(notifFilterValue=>{
        this.filteredValues['iRecibirNotificaciones']=notifFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
      
      this.edoFilter.valueChanges.subscribe(edoFilterValue=>{
        this.filteredValues['sEstado']=edoFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
      this.userFilter.valueChanges.subscribe(userFilterValue=>{
        this.filteredValues['sUsuario']=userFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
  
      this.listData.filterPredicate=this.customFilterPredicate();
    }


    search: any;
selection : any;

applyFilterS(filterValue: string) {
  // console.log(this.search)
  // console.log(this.selection)
  //console.log(filterValue)
  if(this.selection){
    this.listData.filter = this.selection.trim().toLowerCase() || this.search.trim().toLowerCase();
   
  }
  else
  {
     this.listData.filter = this.search.trim().toLowerCase();
  }
 
  
 // console.log(dataSource) 
  if (this.listData.paginator) {
    this.listData.paginator.firstPage();
  }
}


    customFilterPredicate(){
      const myFilterPredicate=function(data:User,filter:string):boolean{
        let searchString=JSON.parse(filter);
        let sNombreFound=data.sNombre.toString().trim().toLowerCase().indexOf(searchString.sNombre.toLowerCase())!==-1
        let sApellidoFound=data.sApellido.toString().trim().indexOf(searchString.sApellido)!==-1
        let sNroTelfFound=data.sTelefono.toString().trim().indexOf(searchString.sTelefono)!==-1
        let sNroCelularFound=data.sMovil.toString().trim().indexOf(searchString.sMovil)!==-1
        let sEmailFound=data.sEmail.toString().trim().indexOf(searchString.sEmail)!==-1
        let iIdPlantaFound=data.sPlanta.toString().trim().indexOf(searchString.sPlanta)!==-1
        let iSuperUsuarioFound=data.iSuperAdmin.toString().trim().indexOf(searchString.iSuperAdmin)!==-1
        let iNotificacionesFound=data.iRecibirNotificaciones.toString().trim().indexOf(searchString.iRecibirNotificaciones)!==-1
        let iEstadoFound=data.sEstado.toString().trim().indexOf(searchString.sEstado)!==-1
        let sUsernameFound=data.sUsuario.toString().trim().indexOf(searchString.sUsuario)!==-1
        
      if(searchString.topFilter){
        return sNombreFound || sApellidoFound || sNroTelfFound || 
        sNroCelularFound || sEmailFound || iIdPlantaFound || iSuperUsuarioFound || iNotificacionesFound || iEstadoFound  || sUsernameFound
      }else{
        return sNombreFound && sApellidoFound && sNroTelfFound && sNroCelularFound &&  sEmailFound  &&  iIdPlantaFound && iSuperUsuarioFound 
        && iNotificacionesFound && iEstadoFound && sUsernameFound
      }
      
      }
      return myFilterPredicate;
    }

    onCreate(){
      const dialogConfig=new MatDialogConfig();
      dialogConfig.disableClose=true;
      dialogConfig.autoFocus=true;
      dialogConfig.width="60%";
      dialogConfig.height="75%";
      this.dialog.open(UserRegisterComponent,dialogConfig);
      this.dialog.afterAllClosed.subscribe(res => {
        this.reload();
        });
    }
  
    onEdit(row){
      this.userService.populateForm(row);
      const dialogConfig=new MatDialogConfig();
      dialogConfig.disableClose=true;
      dialogConfig.autoFocus=true;
      dialogConfig.width="60%";
      dialogConfig.height="75%";
      console.log(this.userService.form)
      this.dialog.open(UserRegisterComponent,dialogConfig);
      this.dialog.afterAllClosed.subscribe(res => {
        this.reload();
        });
       // this.reload();
    }

    onView(row){
     localStorage.setItem('user',JSON.stringify(row));
      this.userService.populateForm(row);
      const dialogConfig=new MatDialogConfig();
      dialogConfig.disableClose=true;
      dialogConfig.autoFocus=true;
      dialogConfig.width="60%";
      dialogConfig.height="75%";
      console.log(this.userService.form)
      this.dialog.open(UserViewComponent,dialogConfig);
      this.dialog.afterAllClosed.subscribe(res => {
        this.reload();
        });
    }
  
    onDelete(data){
      if(confirm("Estas seguro de eliminar este registro?")){
        this.userService.deleteUser(data)
        .subscribe(res=>{
          this.reload();
        });
        this.notificationService.success("El Registro ha sido Eliminado con Éxito");
      }
    }


  ngOnInit(): void {
    this.reload();
    this.boolVisualizar=this.getPrivilegioVisualizar();
    this.boolModificar=this.getPrivilegioModificar();
    this.boolCrear=this.getPrivilegioCrear();
    this.boolEliminar=this.getPrivilegioEliminar();
    
    this.sVisualizar=this.getPrivilegioVisualizarIcon();
    this.sModificar=this.getPrivilegioModificarIcon();
    this.sEliminar=this.getPrivilegioEliminarIcon();
    this.sCrear=this.getPrivilegioCrearIcon();
    
    this.reload();
    this.getPlantas();
    }
  }




