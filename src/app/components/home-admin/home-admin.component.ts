import { Component, OnInit } from '@angular/core';
import { ParametersService } from '../parameters/parameters.service';
import { AccessService } from '../access/access.service';

import { NotificationService } from '../notification/notification.service';
declare var require: any
@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})



export class HomeAdminComponent implements OnInit {

  isVisible= false;
  
  constructor(private service:ParametersService,private accessService:AccessService,private serviceNotification:NotificationService) { }

  insertAcces(data){
    this.accessService.insertAccess(data).subscribe(response=>{
        this.serviceNotification.success("Bienvenido  :D")
        },
        err=>{
          this.serviceNotification.error(err)
        });
    }
  
  ngOnInit(): void {
    this.getAccessData();
    const access: Access = new Access();
    var objUser=JSON.parse(localStorage.getItem('authStatus'))
    var id=objUser.primarysid;
    access.sIp=localStorage.getItem('ipv4')
    access.sNavigator=localStorage.getItem('browserName') + " " +localStorage.getItem('browserVersion')
    access.sAccion="INGRESO";
    access.sUsuario=id
    access.sOrigen=localStorage.getItem('browserOs')
    this.insertAcces(access)
  }

  getAccessData(){
    // handle the case where we don't detect the browser
  if (browser) {
    
    console.log(browser.name);
    console.log(browser.version);
    console.log(browser.os);
    localStorage.setItem('browserName',browser.name)
    localStorage.setItem('browserVersion',browser.version)
    localStorage.setItem('browserOs',browser.os)
    
  }
  
  /*Obtener IP instalar: npm i public-ip */
  const publicIp = require('public-ip');
   
  (async () => {
      console.log(await publicIp.v4());
  
      localStorage.setItem('ipv4',await publicIp.v4())
  })();
  }


  

}

/*Obtener Browser instalar: npm i detect-browser*/
const { detect } = require('detect-browser');
const browser = detect();


class Access{
  iIdAcceso:any;
  sUsuario:any;
  sAccion:any;
  dtFecha:any;
  sIp:any;
  sNavigator:any;
  sOrigen:any;
}