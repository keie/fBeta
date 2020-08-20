import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserPasswordComponent } from './user-pass.component';

const userPasswordRoutes:Routes=[
  {
    path:'',
    component:UserPasswordComponent,
    pathMatch:'full'
    
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(userPasswordRoutes)
  ],
  exports:[RouterModule]
})
export class UserPasswordRoutingModule { }
