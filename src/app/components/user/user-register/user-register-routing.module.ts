import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserRegisterComponent } from './user-register.component';

const userRegisterRoutes:Routes=[
  {
    path:'',
    component:UserRegisterComponent,
    pathMatch:'full'
    
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(userRegisterRoutes)
  ],
  exports:[RouterModule]
})
export class UserRegisterRoutingModule { }
