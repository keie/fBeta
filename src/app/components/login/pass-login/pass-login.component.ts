import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../notification/notification.service';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../user/user.service';
import { User } from '../../user/models/user';
import { PasswordService } from '../../user/password.service';
import {FormGroup,FormControl, Validators,FormBuilder, FormGroupDirective} from "@angular/forms";
import { startWith } from 'rxjs/operators';
import { ScaleService } from '../../scale/scale.service';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pass-login',
  templateUrl: './pass-login.component.html',
  styleUrls: ['./pass-login.component.css']
})
export class PassLoginComponent implements OnInit {

  user:User
  passForm: FormGroup;
  isVisible= false;
  loginError="";
  constructor(public service:UserService,
    private fb:FormBuilder,
    public passwordService:PasswordService,
    public serviceNotification:NotificationService,
    public dialogRef:MatDialogRef<PassLoginComponent>, 
    private authService:AuthService,
    private router:Router) { 

    }

    form = new FormGroup(
      {
        sClaveNew: new FormControl('', Validators.minLength(8)),
        sClaveConfirm: new FormControl('', Validators.minLength(8)),
      },
      passwordMatchValidator
    );
    

  ngOnInit(): void {
    //this.buildpassForm();
  }
/*   buildpassForm(): void{
    this.passForm=this.fb.group({
      sClaveOld:['',[Validators.required]],
      sClaveNew:['',[Validators.required,Validators.minLength(8)]],
      sClaveConfirm:['',[Validators.required,Validators.minLength(8)]],

    });
  } */

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    
  }
  onClose(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

  changePassword(form: FormGroup){
    this.isVisible = true
    var objUser=JSON.parse(localStorage.getItem('authStatus'))
      var id=objUser.primarysid;
    const dto:ChangePassword=new ChangePassword()
    if(id !== undefined && id != null){
      dto.sUsuario = ""
      dto.iIdUsuario= id
      dto.sClaveOld=form.value.sClaveOld
      dto.sClave = form.value.sClaveNew
      dto.dtFechaM = '2020-07-13T22:51:20.777'
    }else{
      dto.sUsuario = this.passwordService.form.value.iIdUsuario.toString()
      dto.iIdUsuario= this.passwordService.form.value.iIdUsuario
      dto.sClaveOld= this.passwordService.form.value.sUsuario
      dto.sClave = form.value.sClaveNew
      dto.dtFechaM = '2020-07-13T22:51:20.777'
    }
    this.passwordService.ChangePassword(dto).
          subscribe(response=>{
            if (response['status'] == 1 && response['objModel']==1){
              this.serviceNotification.success("La contraseña ha sido cambiada con Exito");
              this.login(form)

            } else if(response['objModel']==0){
              this.serviceNotification.error("Contraseña antigua invalida")
            } 
            
            this.isVisible = false
            this.onClose()
          },
        );
  }


  login(form: FormGroup){//endpointLogin
    this.isVisible=true;
    this.authService.login(this.passwordService.form.value.sUsuario,form.value.sClaveNew).
    subscribe(authResponse=>{
        this.isVisible=false;
        this.router.navigate(['/', 'home']);
    },error=>{
      console.log(error);
      this.loginError=error;
      this.isVisible=false
    });
  
}

/* CONTRASEÑA */

passwordErrorMatcher = {
  isErrorState: (control: FormControl, form: FormGroupDirective): boolean => {
    const controlInvalid = control.touched && control.invalid;
    const formInvalid = control.touched && this.form.get('sClaveConfirm').touched && this.form.invalid;
    return controlInvalid || formInvalid;
  }
}

confirmErrorMatcher = {
  isErrorState: (control: FormControl, form: FormGroupDirective): boolean => {
    const controlInvalid = control.touched && control.invalid;
    const formInvalid = control.touched && this.form.get('sClaveNew').touched && this.form.invalid;
    return controlInvalid || formInvalid;
  }
}

getErrorMessage(controlName: string) {
  if (this.form.controls[controlName].hasError('minlength')) {
    return 'La contraseña debe contener mínimo 8 dígitos'
  }

  return 'Las contraseñas no coinciden'
}
}

class ChangePassword{
  sClave:any;
  sClaveOld:any;
  sUsuario:any;
  iIdUsuario:any;
  dtFechaM:any;
}

function passwordMatchValidator(g: FormGroup) {
  const password = g.get('sClaveNew').value;
  const confirm = g.get('sClaveConfirm').value
  return password === confirm ? null : { mismatch: true };
}