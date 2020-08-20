import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../app/auth/auth.service';
import { Router } from '@angular/router';
import { ParametersService } from '../parameters/parameters.service';
import { Parameter } from '../parameters/models/parameter';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PassLoginComponent } from './pass-login/pass-login.component';
import { PasswordService } from '../user/password.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginError="";
  loginForm: FormGroup;
  isVisible= false;
  parameters:Parameter[]
  listData:any
  systemName:any
  constructor(private fb:FormBuilder, private authService:AuthService, private passwordService: PasswordService,private router:Router,private serviceParameter:ParametersService,private dialog: MatDialog) { }

  loadParameters(){
    this.serviceParameter.getParameters().subscribe(
      list=>{
        let array=list.map(item=>{
          if(item.sEstado=="ACTIVO"){
            return{
              sCodigo:item.sCodigo,
              sNombre:item.sNombre,
              sValor:item.sValor,
              sTipo:item.sTipo,
              sGrupo:item.sGrupo,
              sEstado:item.sEstado,
              dtFechaHora:item.dtFechaHora,
              sUsuario:item.sUsuario
            };
          }
        });
        this.parameters=array
        this.listData=array
        localStorage.setItem('parameters',JSON.stringify(this.listData));
      });
  }
  
  
  getNameSystem(){
    var resp="test";
    var parametros = JSON.parse(localStorage.getItem("parameters"));
    parametros.forEach(function(parametro){
      if(parametro.sCodigo=="NOMBRE_SISTEMA"){
      resp=parametro.sValor;
     }
     if(parametro.sCodigo=="EMPRESA"){
      localStorage.setItem('footer',JSON.stringify(parametro.sValor));
     }
     if(parametro.sCodigo=="LOGO"){
      localStorage.setItem('logo',JSON.stringify(parametro.sValor));
     }
     
   });
   return resp;
  }

  
  ngOnInit(): void {
    this.buildLoginForm();
    this.loadParameters();
    this.systemName=this.getNameSystem();
    console.log(this.systemName)
  }

  buildLoginForm(): void{
    this.loginForm=this.fb.group({
      sUsuario:['',[Validators.required]],
      sClave:['',[Validators.required,Validators.minLength(2),Validators.maxLength(50)]]
    });
  }

  login(submittedForm: FormGroup){//endpointLogin
      this.isVisible=true;
      this.authService.login(submittedForm.value.sUsuario,submittedForm.value.sClave).
      subscribe(authResponse=>{
        if(authResponse["objModel"] !== undefined && authResponse["objModel"] != null){
          let dataUser = {
            iIdUsuario:authResponse["objModel"].iIdUsuario,
            sUsuario:authResponse["objModel"].sUsuario,
          }
          this.passwordService.populateUser(dataUser) 
          this.onCreate()
          this.isVisible=false;
        }else{
          this.isVisible=false;
          this.router.navigate(['/', 'home']);
        }
       
          
      },error=>{
        console.log(error);
        this.loginError=error;
        this.isVisible=false
      });
    
  }

  onCreate(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="30%";
    dialogConfig.height="45%";
    this.dialog.open(PassLoginComponent,dialogConfig);
    this.dialog.afterAllClosed.subscribe(res => {
      // this.reload();
      });
  }

}

