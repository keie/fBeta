import { Component, OnInit } from '@angular/core';
import { PrivilegesService } from '../privileges/privileges.service';
import { MatTableDataSource } from '@angular/material/table';

import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  
  
  
  
  id;
  result;
  sNombre;
  menuHeader;
  logo:any
  constructor(private service:PrivilegesService,public router:Router) { }

  ngOnInit(): void {
    this.logo=localStorage.getItem('logo')
    this.reloadPrivileges();
    this.appitemsTravel = this.appitems;
    
  }

  
  listData:any
  sbreadCrumb: string
  reloadPrivileges(){
    var obj=JSON.parse(localStorage.getItem('authStatus'))
      this.id=obj.primarysid;
    this.service.getPrivilegesByIdUser().subscribe(
      list=>{
        let array=list.map(item=>{
              return{
              iIdSeccion:item.iIdSeccion,
              sNombre:item.sNombre,
              sIconClass:item.sIconClass,
              sIconPath:item.sIconPath,
              sTipo:item.sTipo,
              sUrl:item.sUrl,
              sEstado:item.sEstado,
              modelos:item.modelos,
              acciones:item.acciones
            };
        });
        array = array.filter(function(dato){
          return dato != undefined
        });
        this.listData=array;
        localStorage.setItem("privilegios", JSON.stringify(this.listData));
        this.loadBreadCrumb()
      });
  }
  appitemsTravel;

  loadBreadCrumb(){
    console.log(this.listData)
    console.log(this.router.url)
    let arraybread = this.listData.filter((data) => {
      return data.modelos.some((modelo) => {
        return modelo.sUi === this.router.url
      })
    })
    console.log(arraybread)
    let arraybreadMOdel= arraybread[0].modelos.find((modelo) => {
      return modelo.sUi === this.router.url
    })
    console.log(arraybreadMOdel)
    this.sbreadCrumb = arraybread[0].sNombre + " - " + arraybreadMOdel.sNombre
  }

 

  appitems =  [
    {
        "iIdSeccion": 1,
        "sNombre": "RHH",
        "sIconClass": "fas fa-fw fa-list-alt",
        "sIconPath": "fas fa-fw fa-list-alt",
        "sTipo": "URL",
        "sUrl": "NA",
        "sEstado": "ACTIVO",
        "modelos": [
            {
                "iIdModelo": 2,
                "sNombre": "Empleados",
                "sTipo": "MODELO",
                "sUi": "/employee",
                "sEstado": "ACTIVO"
            }
        ],
        "acciones": [
            {
                "iIdAccion": 3,
                "sNombre": "Listar",
                "sIconClass": "fa-fa wri",
                "sIconPath": "~/icons/rrh.png",
                "sEstado": "ACTIVO"
            }
        ]
    },
    {
        "iIdSeccion": 3,
        "sNombre": "Seguridad",
        "sIconClass": "fas fa-fw fa-shield-alt",
        "sIconPath": "fas fa-fw fa-shield-alt",
        "sTipo": "URL",
        "sUrl": "NA",
        "sEstado": "ACTIVO",
        "modelos": [
            {
                "iIdModelo": 1,
                "sNombre": "Usuarios",
                "sTipo": "MODELO",
                "sUi": "/users",
                "sEstado": "ACTIVO"
            },
            {
                "iIdModelo": 8,
                "sNombre": "Accessos",
                "sTipo": "MODELO",
                "sUi": "/access",
                "sEstado": "ACTIVO"
            },
            {
                "iIdModelo": 7,
                "sNombre": "Autorizaciones",
                "sTipo": "MODELO",
                "sUi": "/authorization",
                "sEstado": "ACTIVO"
            }
        ],
        "acciones": [
            {
                "iIdAccion": 3,
                "sNombre": "Listar",
                "sIconClass": "fa-fa wri",
                "sIconPath": "~/icons/rrh.png",
                "sEstado": "ACTIVO"
            },
            {
                "iIdAccion": 3,
                "sNombre": "Listar",
                "sIconClass": "fa-fa wri",
                "sIconPath": "~/icons/rrh.png",
                "sEstado": "ACTIVO"
            },
            {
                "iIdAccion": 1,
                "sNombre": "Visualizar",
                "sIconClass": "fa-fa wri",
                "sIconPath": "~/icons/rrh.png",
                "sEstado": "ACTIVO"
            }
        ]
    }
]

  menuChange(menuChange) {

    if (menuChange.items) {

      this.appitemsTravel = menuChange.items;
      this.menuHeader.push({
        "iIdSeccion": 1,
        "sNombre": "RHH",
        "sIconClass": "fas fa-fw fa-list-alt",
        "sIconPath": "fas fa-fw fa-list-alt",
        "sTipo": "URL",
        "sUrl": "NA",
        "sEstado": "ACTIVO",
        "modelos": [
            {
                "iIdModelo": 2,
                "sNombre": "Empleados",
                "sTipo": "MODELO",
                "sUi": "/employee",
                "sEstado": "ACTIVO"
            }
        ],
        "acciones": [
            {
                "iIdAccion": 3,
                "sNombre": "Listar",
                "sIconClass": "fa-fa wri",
                "sIconPath": "~/icons/rrh.png",
                "sEstado": "ACTIVO"
            }
        ]
    },);
      // this.menuHeader.push(menuChange);

      console.log('hasMultiMenuLabel');
    }
  }
iIdSeccion;
modelos;
acciones
  breadCrumbMain() {
    
    this.appitemsTravel = this.appitems;
    let list: any[] = [];

    this.appitems.forEach(element => {

 

              
  /*            this.iIdSeccion = element.iIdSeccion,
              this.sNombre = element.sNombre,
              this.modelos = element.modelos,
              this.acciones = element.acciones
            


        this.menuHeader = [];
        console.log (this.menuHeader); 
*/
        
        

/* */  list.push(element.iIdSeccion );

    this.sNombre = element.sNombre;
      
    console.log(this.sNombre);
    console.log(element.iIdSeccion);  

});
 /*    for (let num of this.appitemsTravel) {
      console.log(num);
  } */
  this.menuHeader = [];

    
  }


  breadCrumb(menu, index) {
    console.log('sub breadCrumb');
    this.menuHeader.splice(index + 1, this.menuHeader.length - 1);
    if (menu[index] && menu[index].items && menu[index].items.length) {
      this.appitemsTravel = menu[index].items;
    }
  }


}
