import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../notification/notification.service';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { User } from '../models/user';
import { PasswordService } from '../password.service';
import {FormGroup,FormControl, Validators,FormBuilder, FormGroupDirective} from "@angular/forms";
import { startWith } from 'rxjs/operators';
import { ScaleService } from '../../scale/scale.service';


@Component({
  selector: 'app-user-pass',
  templateUrl: './user-pass.component.html',
  styleUrls: ['./user-pass.component.css']
})
export class UserPasswordComponent implements OnInit {

  user:User
  passForm: FormGroup;
  isVisible= false;
  loginError="";
  constructor(public service:UserService,
    private fb:FormBuilder,
    public passwordService:PasswordService,
    public serviceNotification:NotificationService,
    public dialogRef:MatDialogRef<UserPasswordComponent>) { 

    }

    form = new FormGroup(
      {
        sClaveOld: new FormControl(''),
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
    var objUser=JSON.parse(localStorage.getItem('authStatus'))
    var id=objUser.primarysid;
    var user = JSON.parse(localStorage.getItem("user"));
    const dto:ChangePassword=new ChangePassword()
    dto.sUsuario = ""
    dto.iIdUsuario= id
    dto.sClaveOld=form.value.sClaveOld
    dto.sClave = form.value.sClaveNew
    dto.dtFechaM = '2020-07-13T22:51:20.777'
    this.passwordService.ChangePassword(dto).
          subscribe(response=>{
            if (response['status'] == 1 && response['objModel']==1){
              this.serviceNotification.success("La contraseña ha sido cambiada con Exito");
            } else if(response['objModel']==0){
              this.serviceNotification.error("Contraseña antigua invalida")
            } 
          },
        );
        this.onClose()
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