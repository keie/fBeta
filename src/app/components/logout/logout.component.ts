import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { AccessService } from '../access/access.service';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-logout',
  template:`
    <p>
      Loggin out...
    </p>
  `
})
export class LogoutComponent implements OnInit {

  constructor(private router:Router ,private authService:AuthService,private accessService:AccessService,private serviceNotification:NotificationService) { }


  insertAcces(data){
    this.accessService.insertAccess(data).subscribe(response=>{
        this.serviceNotification.success("Nos vemos pronto  :D")
        },
        err=>{
          this.serviceNotification.error(err)
        });
    }


  ngOnInit(): void {
    const access: Access = new Access();
    var objUser=JSON.parse(localStorage.getItem('authStatus'))
    var id=objUser.primarysid;
    access.sIp=localStorage.getItem('ipv4')
    access.sNavigator=localStorage.getItem('browserName') + " " +localStorage.getItem('browserVersion')
    access.sAccion="CIERRE";
    access.sUsuario=id
    access.sOrigen=localStorage.getItem('browserOs')
    this.insertAcces(access)
    this.authService.logout();
    this.router.navigate(['/']);
  }

}

class Access{
  iIdAcceso:any;
  sUsuario:any;
  sAccion:any;
  dtFecha:any;
  sIp:any;
  sNavigator:any;
  sOrigen:any;
}
