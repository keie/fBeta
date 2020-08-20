import { Component, OnInit } from '@angular/core';
import { User } from '../user/models/user';
import { UserService } from '../user/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationService } from '../notification/notification.service';
import { UserRegisterComponent } from '../user/user-register/user-register.component';
import { UserViewComponent } from '../user/user-view/user-view.component';
import { UserPasswordComponent } from '../user/user-pass/user-pass.component';
import { ProfileComponent } from '../user/profile/profile.component';
import { PassLoginComponent } from '../login/pass-login/pass-login.component';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  sNames;
 
  constructor(private userService:UserService,
    private dialog: MatDialog,
    private notificationService:NotificationService) { 
   
  }

  ngOnInit(): void {
      var obj=JSON.parse(localStorage.getItem('authStatus'))
      this.sNames=obj.unique_name;

  }


    onCreate(){
      const dialogConfig=new MatDialogConfig();
      dialogConfig.disableClose=true;
      dialogConfig.autoFocus=true;
      dialogConfig.width="60%";
      dialogConfig.height="75%";
      this.dialog.open(ProfileComponent,dialogConfig);
      this.dialog.afterAllClosed.subscribe(res => {

        });
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

        });
    }

    openDialog(): void {
      const dialogConfig=new MatDialogConfig();
        dialogConfig.disableClose=true;
        dialogConfig.autoFocus=true;
        dialogConfig.width="30%";
        dialogConfig.height="50%";
        this.dialog.open(UserPasswordComponent,dialogConfig);
        this.dialog.afterAllClosed.subscribe(res => {
          
          });
      
    }

    openDialogL(): void {
      const dialogConfig=new MatDialogConfig();
        dialogConfig.disableClose=true;
        dialogConfig.autoFocus=true;
        dialogConfig.width="30%";
        dialogConfig.height="50%";
        this.dialog.open(PassLoginComponent,dialogConfig);
        this.dialog.afterAllClosed.subscribe(res => {
          
          });
      
    }
 

}
