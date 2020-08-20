import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AccessListComponent } from './access-list/access-list.component';

const AccessRoutes : Routes=[
  {
    path:'',
    component:AccessListComponent,
    pathMatch:'full',
   
    
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(AccessRoutes)
  ],
  exports:[RouterModule]
})
export class AccessRoutingModule { }
