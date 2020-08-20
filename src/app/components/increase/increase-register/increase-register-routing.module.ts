import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IncreaseRegisterComponent } from './increase-register.component';

const IncreaseRegisterRoutes:Routes=[
  {
    path:'',
    component:IncreaseRegisterComponent,
    pathMatch:'full'
    
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(IncreaseRegisterRoutes)
  ],
  exports:[RouterModule]
})
export class IncreaseRegisterRoutingModule { }
