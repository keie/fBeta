import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IncreaseListComponent } from './increase-list/increase-list.component';

const IncreaseRoutes : Routes=[
  {
    path:'',
    component:IncreaseListComponent,
    pathMatch:'full',
   
    
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(IncreaseRoutes)
  ],
  exports:[RouterModule]
})
export class IncreaseRoutingModule { }
