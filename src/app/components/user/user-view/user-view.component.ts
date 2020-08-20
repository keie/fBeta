import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../notification/notification.service';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { User } from '../models/user';
import { PasswordService} from '../password.service';
import { PlantasService } from '../../plantas/plantas.service';
import { PrivilegesService } from '../../privileges/privileges.service';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserPasswordComponent } from '../user-pass/user-pass.component';
import {ThemePalette} from '@angular/material/core';
import { GetUserResponseDTO } from '../models/getUserResponseDTO';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}


@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  user:User
  flag=0;
  getUserResponseDTO:GetUserResponseDTO
  
userInfo:any

  constructor(public service:UserService,
    public sPasswordService:PasswordService,
    public serviceNotification:NotificationService,
    private dialog: MatDialog,
    public dialogRef:MatDialogRef<UserViewComponent>,
    public servicePlanta:PlantasService,
    public privilegesService:PrivilegesService) { }


    treeView: any = []
    listPlantas: any = []

    validatePlantas(planta){
      return this.userInfo.objModel.plantas.some( p => p.sCodigo === planta);
    }
    validatePlanta(planta){
      return this.userInfo.objModel.user.sPlanta=== planta;
    }

    validatePrivilegios(seccion,modelo,accion){
      return this.userInfo.objModel.privilegios.some( p => p.iIdSeccion == seccion && p.modelos.some( m => m.iIdModelo==modelo && m.acciones.some(a => a.iIdAccion == accion)));
    }

    validateCargo(cargo){      
      let bool = false
      if(cargo === "todos"){
        bool = 1 == this.userInfo.objModel.user.iCargo
      }
      if(cargo === "jefe"){
        bool = 1 == this.userInfo.objModel.user.iCargoJefe
      }
      if(cargo === "gerente"){
        bool = 1 == this.userInfo.objModel.user.iCargoGerente
      }
      console.log(bool)
      return bool;
    }
    populateCheck(type){
      
      if(type === "isSuperUsuario"){
        return this.userInfo.objModel.user.iSuperAdmin == 1
      }
      if(type === "notificaciones"){
        return this.userInfo.objModel.user.iRecibirNotificaciones == 1
      }
      if(type === "sPlanta" && this.flag==0){
        for(var i=0;i<=this.listPlantas.length-1;i++){
         // return this.userInfo.objModel.user.sPlanta == this.listPlantas[i].sCodigo
         if(this.userInfo.objModel.user.sPlanta === this.listPlantas[i].sCodigo){
           this.flag++
           return true
           
         }
        }
      }
    }
  ngOnInit(): void {
    this.loadTreeVIew()
    this.getPlantas()
    this.loadFullDataUser()
    
      
  }

  loadFullDataUser(){
    var obj=JSON.parse(localStorage.getItem('user'))
    var id=obj.iIdUsuario
    this.service.getFullUserDetail(id).subscribe(response=>{
      this.userInfo=response
    })
  }
  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    
  }
  onClose(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

  loadTreeVIew(){
    this.privilegesService.getTreeView().subscribe(
      list=>{
        let array=list['objModel'].map(item=>{
          return{
              seccion:item.seccion,
              modelos:item.seccion.modelos,
             // acciones:item.seccion.modelo.accion
              
              

            };
        });
        array = array.filter(function(dato){
          return dato != undefined
        });
        this.treeView=array;
        
      });
  }
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

  passwordReestablish(){
    var objUser=JSON.parse(localStorage.getItem('authStatus'))
    var id=objUser.primarysid;

    var user = JSON.parse(localStorage.getItem("user"));
            const dto:PasswordReestablish=new PasswordReestablish()
            dto.sUsuarioR=user['sUsuario']
            dto.sUsuarioE = id
            dto.iIdUsuario = user['iIdUsuario']
            dto.dtFechaM = '2020-07-13T22:51:20.777'
            console.log(dto)

    
    this.sPasswordService.PasswordReestablish(dto).subscribe
    (response => {
            console.log(response['objModel'], "aqui")

            if (response['status'] == 1){
              this.serviceNotification.success("El reestablecimiento  fue Exitoso");
            } else{
              console.log ("ALGO SALIO MAL")
            } 
          
    
        }
        );   
  }

 














  
  onSubmit(){
    if(this.service.form.valid){
      
      const obj=Object.assign({},this.user,this.service.form.value)
      obj.roles=[]
      if(!this.service.form.get('iIdUsuario').value){
        this.service.insertUser(obj)
        .subscribe(response=>{
        console.log("works! insert");
        },
        err=>{
          this.serviceNotification.error(err)
          this.onClose();
        });
      }else{
        this.service.updateUser(obj)
        .subscribe(response=>{
        console.log("works! update");
        },
        err=>{
          this.serviceNotification.error(err)
          this.onClose();
        });
      }
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.serviceNotification.success(":: Operation Successfully");
      this.onClose();
      
    }else{
      console.log('not valid');
    }
  }

  
  openDialog(value) {
    const dialogConfig=new MatDialogConfig();
        dialogConfig.disableClose=true;
        dialogConfig.autoFocus=true;
        dialogConfig.width="30%";
        dialogConfig.height="60%";
      this.flag=1
      if(value>=0){
        if(confirm("Estas seguro que deseas reestablecer la contraeña de este usuario?")){
            this.sPasswordService.PasswordReestablish(value)
            .subscribe(res=>{
              this.onClose();
            });
            this.serviceNotification.success("Restablecimiento realizado");
            this.onClose();
          }
        
        
      }else{
  
        this.dialog.open(UserPasswordComponent,dialogConfig);
        this.dialog.afterAllClosed.subscribe(res => {
  
          });
        
        
      }
      
    }



/*   openDialog() {
    const dialogRef = this.dialog.open(UserPasswordComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  } */

  /*checkbox ejemplo 
  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Primary', completed: false, color: 'primary'},
      {name: 'Accent', completed: false, color: 'accent'},
      {name: 'Warn', completed: false, color: 'warn'}
    ]
  };
  allComplete: boolean = false;
  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }
  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }
  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => t.completed = completed);
  }*/
}

 class PasswordReestablish{
  sUsuarioE:any;
  iIdUsuario:any;
  sUsuarioR:any;
  dtFechaM:any;
}