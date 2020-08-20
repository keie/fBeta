import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';

const EmployeeRoutes : Routes=[
  {
    path:'',
    component:EmployeeListComponent,
    pathMatch:'full',
   
    
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(EmployeeRoutes)
  ],
  exports:[RouterModule]
})
export class EmployeeRoutingModule { }
