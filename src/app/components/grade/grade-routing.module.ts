import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GradeListComponent } from './grade-list/grade-list.component';

const GradeRoutes : Routes=[
  {
    path:'',
    component:GradeListComponent,
    pathMatch:'full',
   
    
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(GradeRoutes)
  ],
  exports:[RouterModule]
})
export class GradeRoutingModule { }
