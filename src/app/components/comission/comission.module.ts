import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComissionRoutingModule } from './comission-routing.module';
import { ComissionListComponent } from './comission-list/comission-list.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';



@NgModule({
  declarations: [ComissionListComponent],
  imports: [
    CommonModule,
    ComissionRoutingModule,
   
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  exports:[ComissionListComponent]
})
export class ComissionModule { }
