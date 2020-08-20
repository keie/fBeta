import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserViewComponent } from './user-view.component';

const userViewRoutes:Routes=[
  {
    path:'',
    component:UserViewComponent,
    pathMatch:'full'
    
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(userViewRoutes)
  ],
  exports:[RouterModule]
})
export class UserViewRoutingModule { }
