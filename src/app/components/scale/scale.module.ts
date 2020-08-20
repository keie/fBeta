import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScaleRoutingModule } from './scale-routing.module';
import { ScaleListComponent } from './scale-list/scale-list.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';



@NgModule({
  declarations: [ScaleListComponent],
  imports: [
    CommonModule,
    ScaleRoutingModule,
   
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  exports:[ScaleListComponent]
})
export class ScaleModule { }
