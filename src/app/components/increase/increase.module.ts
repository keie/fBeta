import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncreaseRegisterComponent } from './increase-register/increase-register.component';
import { IncreaseRoutingModule } from './increase-routing.module';
import { IncreaseListComponent } from './increase-list/increase-list.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';



@NgModule({
  declarations: [IncreaseListComponent],
  imports: [
    CommonModule,
    IncreaseRoutingModule,
   
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  exports:[IncreaseListComponent]
})
export class IncreaseModule { }
