import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ComissionListComponent } from './comission-list/comission-list.component';

const ComissionRoutes : Routes=[
  {
    path:'',
    component:ComissionListComponent,
    pathMatch:'full',
   
    
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ComissionRoutes)
  ],
  exports:[RouterModule]
})
export class ComissionRoutingModule { }
