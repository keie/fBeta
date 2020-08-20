import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../notification/notification.service';
import { MatDialogRef } from '@angular/material/dialog';
import { IncreaseService } from '../increase.service';
import { User } from '../models/increase';

@Component({
  selector: 'app-increase-register',
  templateUrl: './increase-register.component.html',
  styleUrls: ['./increase-register.component.css']
})
export class IncreaseRegisterComponent implements OnInit {
  user:User
  constructor(public service:IncreaseService,
    public serviceNotification:NotificationService,
    public dialogRef:MatDialogRef<IncreaseRegisterComponent>) { }

  ngOnInit(): void {
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
  onSubmit(){
    if(this.service.form.valid){
      
      const obj=Object.assign({},this.user,this.service.form.value)
      obj.roles=[]
      if(!this.service.form.get('iId').value){
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
}
