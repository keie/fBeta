
import { Component, OnInit, ViewChild, ViewChildren, QueryList ,Input} from '@angular/core';
import { NotificationService } from '../../notification/notification.service';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { User } from '../models/user';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserPasswordComponent } from '../user-pass/user-pass.component';
import {ThemePalette} from '@angular/material/core';
import { PasswordReestablishComponent } from '../password-reestablish/password-reestablish.component';
import { PasswordService } from '../password.service';
import { ConstantPool } from '@angular/compiler';
import { PlantasService } from '../../plantas/plantas.service';
import { Planta } from '../../plantas/models/planta';
import { NgModelGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatCheckbox} from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { PrivilegesService } from '../../privileges/privileges.service';
import { treeView } from '../../privileges/models/treeView';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})


export class UserRegisterComponent implements OnInit {
  user:User
  
  planta:Planta
  treeView:any
  listData:MatTableDataSource<any>;
  plantaUser:any
  auxPlanta:any
  //userInfo:any
  constructor(public service:UserService,
    public serviceNotification:NotificationService,
    private servicePrivilege:PrivilegesService,
    private dialog: MatDialog,
    public dialogRef:MatDialogRef<UserRegisterComponent>,public sPasswordService:PasswordService,public servicePlanta:PlantasService) { }
    
  
    secciones: any[] = []
    plantas: any[] = []
    isSuperUsuario : boolean = false;
    notificaciones : boolean = false;
    todos : boolean = false
    gerentes : boolean = false
    jefes : boolean = false
    userInfo:any = {
      objModel : {
        user : {
          iCargo: 0,
          iCargoJefe: 0,
          iCargoGerente: 0,
          iSuperAdmin: 0,
          iRecibirNotificaciones: 0
        }
      }
    }
    
  
  checkboxChange(checkbox: MatCheckbox, checked: boolean) {
    console.log("checkbox.value", checkbox.value)
    console.log("checked", checked)

    if(checked)
      this.secciones.push(checkbox.value)
    else
      this.secciones.splice(this.secciones.map( p => JSON.stringify(p) ).indexOf(JSON.stringify(checkbox.value)), 1 )
    console.log(this.secciones.map( p => JSON.stringify(p) ).indexOf(JSON.stringify(checkbox.value)))
    console.log(this.secciones)
  }

  checkboxChangePlantas(checkbox: MatCheckbox, checked: boolean) {
    //{'sCodigo' : element.sCodigo , 'sEstado' : '', sNombre: ''}"
    //console.log("checked", checked)
    console.log(this.plantas)
    console.log(checkbox.value)

    if(checked)
      this.plantas.push({'sCodigo' : checkbox.value , 'sEstado' : '', 'sNombre': ''})
    else
      this.plantas.splice(this.plantas.map( p => p.sCodigo ).indexOf(checkbox.value),1)
      console.log(this.plantas.map( p => p.sCodigo ).indexOf(checkbox.value),1)
    console.log(this.plantas)
  }

  checkboxChangeSuperUsuario(checkbox: MatCheckbox, checked: boolean) {
    if(checkbox.value === "isSuperUsuario" )
      this.isSuperUsuario = checked

      if(checkbox.value === "notificaciones" )
      this.notificaciones = checked
    if(checkbox.value === "todos" )
      this.todos = checked

    if(checkbox.value === "gerentes" )
      this.gerentes = checked

    if(checkbox.value === "jefes" )
      this.jefes = checked

    
        
  }
  populateCheckboxInternos(){
    if(this.userInfo.objModel !== undefined && this.userInfo.objModel.user !== undefined && this.userInfo.objModel.user != null && this.userInfo.objModel != null ){
      this.todos=1 == this.userInfo.objModel.user.iCargo
      this.jefes=1 == this.userInfo.objModel.user.iCargoJefe
      this.gerentes=1 == this.userInfo.objModel.user.iCargoGerente
      this.isSuperUsuario = this.userInfo.objModel.user.iSuperAdmin == 1
      this.notificaciones = this.userInfo.objModel.user.iRecibirNotificaciones == 1
    }
    
  }

  validateCargo(cargo){      
    let bool = false
    if( this.service.form.controls['iIdUsuario'].value){
      if(cargo === "todos"){
        
        bool = 1 == this.userInfo.objModel.user.iCargo
      }
      if(cargo === "jefe"){
        
        bool = 1 == this.userInfo.objModel.user.iCargoJefe

      }
      if(cargo === "gerente"){
        bool = 1 == this.userInfo.objModel.user.iCargoGerente
      }
    }
      
    return bool;
  }
  
  populateCheck(type){
    if(type === "isSuperUsuario"){
      
      return this.isSuperUsuario
    }
    if(type === "notificaciones"){
      
      return this.notificaciones
    }
  }
  flag=0


loadFullDataUser(id){
  
   this.service.getFullUserDetail(id).subscribe(response=>{
    this.userInfo=response
    this.flag++
    this.populateCheckBox()

    this.populateCheckboxInternos()


    if(!this.service.form.value.iIdUsuario){
  console.log(this.userInfo)
      this.service.populateForm(this.userInfo.objModel.user);
    }
    
  })
  return this.userInfo;
}
  
  
  loadTreeVIew(){
    this.servicePrivilege.getTreeView().subscribe(
      list=>{
        let array=list['objModel'].map(item=>{
          return{
              seccion:item.seccion,
              modelos:item.seccion.modelos,
             };
        });
        array = array.filter(function(dato){
          return dato != undefined
        });
        this.treeView=array;
      });
    }
  
  
  
  @ViewChildren ('checkBox' ) checkBox:QueryList<any>;
  checked = [];


getCheckbox(checkbox){
    this.checked = []; // resetting each Time new event is fire.
 // filtering only checked vlaue and assign to checked variable.
  const checked = this.checkBox.filter(checkbox => checkbox.checked);

 // then, we make object array of checked, and value by checked variable  
    /*checked.forEach(data => {
         this.checked.push ({
             'checked' : data.checked,
             'value':  data.value
         })
         return this.plantaUser=data.value
    })*/
    this.plantaUser=checkbox.value
    this.auxPlanta=checkbox.value
    console.log(this.plantaUser)
    return this.plantaUser;
    
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

  
getPlantas(){
  this.servicePlanta.getPlantas().subscribe(
    list=>{
      console.log(list)
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
       this.listData=array;
       console.log(this.listData)
       
    });
    
}




  ngOnInit(): void {

    this.getPlantas()
    this.loadTreeVIew()
    if(this.service.form.value.iIdUsuario){
      this.populateCheckBox()
      this.loadFullDataUser(this.service.form.value.iIdUsuario)
    }
    console.log(this.service.form.value)
    
  }

  populateCheckBox(){
    if(this.flag>=1){
      for (let i = 0 ; i < this.userInfo.objModel.privilegios.length ; i++){
        for (let j = 0 ; j < this.userInfo.objModel.privilegios[i].modelos.length ; j++){
          for (let k = 0 ; k < this.userInfo.objModel.privilegios[i].modelos[j].acciones.length ; k++){
            this.secciones.push({
              iIdUsuario: 0, 
              iIdSeccion: this.userInfo.objModel.privilegios[i].iIdSeccion, 
              iIdModelo: this.userInfo.objModel.privilegios[i].modelos[j].iIdModelo,
              iIdAccion: this.userInfo.objModel.privilegios[i].modelos[j].acciones[k].iIdAccion
            })
          }
        }
      }
      this.plantas = this.userInfo.objModel.plantas
      console.log("populateCheckBox")
      console.log(this.plantas)
      console.log(this.secciones)

    }
    
  }

  
  validatePlantas(planta){
    if(this.plantas.some( p => p.sCodigo === planta)){
      this.plantaUser = planta
    }
    
    return this.plantas.some( p => p.sCodigo === planta);

  }
  validatePlanta(planta){
    return this.userInfo.objModel.user.sPlanta=== planta;
  }

  validatePrivilegios(seccion, modelo , accion){
    return this.secciones.some( p => p.iIdSeccion == seccion && p.iIdModelo==modelo && p.iIdAccion == accion);
  }



  onSubmit(){
   // if(this.service.form.valid && this.flag!=1){
      const dto:Register=new Register()
      var iSuperUser=0;
      var notificaciones=0
      var todos=0
      var gerentes=0
      var jefes=0
      const obj=Object.assign({},this.user,this.service.form.value)
      obj.roles=[]
      //obj.sPlanta=this.plantaUser
      if(this.auxPlanta==undefined){
        this.auxPlanta=this.plantaUser
      }
      obj.sPlanta=this.auxPlanta
      if(this.isSuperUsuario){
        iSuperUser=1;
      }
      if(this.notificaciones){
        notificaciones=1;
      }
      if(this.todos){
        todos=1;
      }
      if(this.gerentes){
        gerentes=1;
      }
      if(this.jefes){
        jefes=1;
      }
      obj.iRecibirNotificaciones=notificaciones
      obj.iSuperAdmin=iSuperUser
      obj.iCargo=todos
      obj.iCargoGerente=gerentes
      obj.iCargoJefe=jefes
      obj.dtFecha="2020-07-13T22:51:20.777"
      obj.dtFechaM="2020-07-13T22:51:20.777"
      obj.sUsuarioM="NA"
      
    
      
      dto.user=obj
      dto.plantas=this.plantas
      dto.privilegios=this.secciones
      if(!this.service.form.get('iIdUsuario').value){
        obj.iIdUsuario=0
        this.service.insertUser(dto)
        .subscribe(response=>{
          console.log("works! insert");
          this.service.form.reset();
          this.service.initializeFormGroup();
          this.serviceNotification.success("El registro ha sido Creado con Éxito");
          this.onClose();
        },
        err=>{
          this.serviceNotification.error(err)
          this.onClose();
        });
      }else{
        dto.user.iIdUsuario=this.service.form.get('iIdUsuario').value
        
        this.service.updateUser(dto)
        .subscribe(response=>{
          console.log("works! update");
          this.service.form.reset();
          this.service.initializeFormGroup();
          this.serviceNotification.success("El registro ha sido Guardado con Éxito");
          this.onClose();
        },
        err=>{
          this.serviceNotification.error(err)
          this.onClose();
        });
      }
      
      
  /*  }else{
      console.log('not valid');
    }*/
  }

 openDialog(value) {
  const dialogConfig=new MatDialogConfig();
      dialogConfig.disableClose=true;
      dialogConfig.autoFocus=true;
      dialogConfig.width="30%";
      dialogConfig.height="60%";
    this.flag=1
    if(value>=0){
      if(confirm("¿Está seguro que desea reestablecer la contraseña de este usuario?")){
          this.sPasswordService.PasswordReestablish(value)
          .subscribe(res=>{
            this.onClose();
          });
          this.serviceNotification.success("Se ha Reestablecido la Contaseña con Éxito");
          this.onClose();
        }
      
      
    }else{

      this.dialog.open(UserPasswordComponent,dialogConfig);
      this.dialog.afterAllClosed.subscribe(res => {

        });
      
      
    }
    
  } 

  
}

class Register{
  user:any;
  plantas:any;
  privilegios:any;
  
}
