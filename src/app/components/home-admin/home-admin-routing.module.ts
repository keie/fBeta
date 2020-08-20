import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeAdminComponent } from './home-admin.component';

const homeAdminRoutes : Routes=[
  {
    path:'',
    component:HomeAdminComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(homeAdminRoutes)
  ],
  exports:[RouterModule]
})
export class HomeAdminRoutingModule { }
