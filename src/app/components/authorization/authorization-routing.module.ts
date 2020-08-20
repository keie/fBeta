import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationListComponent } from './authorization-list/authorization-list.component';

const AuthorizationRoutes : Routes=[
  {
    path:'',
    component:AuthorizationListComponent,
    pathMatch:'full',
   
    
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthorizationRoutes)
  ],
  exports:[RouterModule]
})
export class AuthorizationRoutingModule { }
