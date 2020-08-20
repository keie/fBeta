import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { NotificationService } from '../../notification/notification.service';
import { FormControl, FormGroup } from '@angular/forms';
import {  Access } from '../models/access';
import { AccessService } from '../access.service';

@Component({
  selector: 'access-user-list',
  templateUrl: './access-list.component.html',
  styleUrls: ['./access-list.component.css']
})




export class AccessListComponent implements OnInit {

  
  //displayedColumns: string[] = ['actions','address', 'id','birthday','lastname', 'name','username','password'];
  displayedColumns: string[] = ['sUsuario','sAccion','dtFecha', 
  'sIp',"sNavigator","sOrigen"];
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator:MatPaginator
  isVisible= false;
  constructor(private service:AccessService,
    private dialog: MatDialog,
    private notificationService:NotificationService) { }
    
    sUsuarioFilter=new FormControl();
    sIpFilter=new FormControl();
    sNavigatorFilter=new FormControl();
    sOrigenFilter=new FormControl();
    dtFechaFilter=new FormControl();
    sAccionFilter=new FormControl();
    
    

    filteredValues={sUsuario:"",sAccion:"",dtFecha:"",sIp:"",sNavigator:"",sOrigen:""}

    listData:MatTableDataSource<any>;

    reload(){
      this.isVisible=true;
      this.service.getAccessList().subscribe(
        list=>{
          let array=list.map(item=>{
              return{
                sUsuario:item.sUsuario,
                sIp:item.sIp,
                sNavigator:item.sNavigator,
                sOrigen:item.sOrigen,
                dtFecha:item.dtFecha,
                sAccion:item.sAccion
              };
          });
          array = array.filter(function(dato){
            return dato != undefined
          });
          this.listData=new MatTableDataSource(array);
          this.listData.sort=this.sort;
          this.listData.paginator=this.paginator;
          this.isVisible=false;
        });
    }

    applyFilter() {
      
      this.sUsuarioFilter.valueChanges.subscribe(sUsuarioFilterValue=>{
        this.filteredValues['sUsuario']=sUsuarioFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
      this.sIpFilter.valueChanges.subscribe(sIpFilterValue=>{
        this.filteredValues['sIp']=sIpFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
      this.sNavigatorFilter.valueChanges.subscribe(sNavigatorFilterValue=>{
        this.filteredValues['sNavigator']=sNavigatorFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
      this.sOrigenFilter.valueChanges.subscribe(sOrigenFilterValue=>{
        this.filteredValues['sOrigen']=sOrigenFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
      this.dtFechaFilter.valueChanges.subscribe(dtFechaFilterValue=>{
        this.filteredValues['dtFecha']=dtFechaFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
      this.sAccionFilter.valueChanges.subscribe(sAccionFilterValue=>{
        this.filteredValues['sAccion']=sAccionFilterValue;
        this.listData.filter=JSON.stringify(this.filteredValues);
      })
 
      this.listData.filterPredicate=this.customFilterPredicate();
    }


    customFilterPredicate(){
      const myFilterPredicate=function(data:Access,filter:string):boolean{
        let searchString=JSON.parse(filter);
        let sUsuarioFound=data.sUsuario.toString().trim().toLowerCase().indexOf(searchString.sUsuario.toLowerCase())!==-1
        let sIpFound=data.sIp.toString().trim().indexOf(searchString.sIp)!==-1
        let sNavigatorFound=data.sNavigator.toString().trim().indexOf(searchString.sNavigator)!==-1
        let sOrigenFound=data.sOrigen.toString().trim().indexOf(searchString.sOrigen)!==-1
        let dtFechaFound=data.dtFecha.toString().trim().indexOf(searchString.dtFecha)!==-1
        let sAccionFound=data.sAccion.toString().trim().indexOf(searchString.sAccion)!==-1
        
      if(searchString.topFilter){
        return sUsuarioFound || sIpFound || sNavigatorFound || 
        sOrigenFound || dtFechaFound || sAccionFound
      }else{
        return sUsuarioFound && sIpFound && sNavigatorFound && sOrigenFound &&  dtFechaFound  && sAccionFound
      }
      
      }
      return myFilterPredicate;
    }



  ngOnInit(): void {
    this.reload();
  }

}
