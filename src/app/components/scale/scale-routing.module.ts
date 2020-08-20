import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ScaleListComponent } from './scale-list/scale-list.component';

const ScaleRoutes : Routes=[
  {
    path:'',
    component:ScaleListComponent,
    pathMatch:'full',
   
    
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ScaleRoutes)
  ],
  exports:[RouterModule]
})
export class ScaleRoutingModule { }
