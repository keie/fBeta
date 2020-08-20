import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradeRoutingModule } from './grade-routing.module';
import { GradeListComponent } from './grade-list/grade-list.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';



@NgModule({
  declarations: [GradeListComponent],
  imports: [
    CommonModule,
    GradeRoutingModule,
   
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  exports:[GradeListComponent]
})
export class GradeModule { }
