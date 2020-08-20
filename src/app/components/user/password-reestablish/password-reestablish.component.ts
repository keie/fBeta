import { Component, OnInit } from '@angular/core';
import { PasswordService } from '../password.service';
import { NotificationService } from '../../notification/notification.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-password-reestablish',
  templateUrl: './password-reestablish.component.html',
  styleUrls: []
})
export class PasswordReestablishComponent implements OnInit {

  constructor(public passwordService:PasswordService,public serviceNotification:NotificationService,
    private dialog: MatDialog,
    public dialogRef:MatDialogRef<PasswordReestablishComponent>) { }

  ngOnInit(): void {
    
  }

      updatePassword(){
        var data
        this.passwordService.PasswordReestablish(data).
        subscribe(response=>{
          if (response['status'] == 1){
            this.serviceNotification.success("LA contraseña ha sido cambiada con Exito");
          } else{
            this.serviceNotification.error("Hubo un error")
          } 
        },
      );
      }
  }


