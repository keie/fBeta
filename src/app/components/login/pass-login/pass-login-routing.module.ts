import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PassLoginComponent } from './pass-login.component';

const PassLoginRoutes:Routes=[
  {
    path:'',
    component:PassLoginComponent,
    pathMatch:'full'
    
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(PassLoginRoutes)
  ],
  exports:[RouterModule]
})
export class PassLoginRoutingModule { }
