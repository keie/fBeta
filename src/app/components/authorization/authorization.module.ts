import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizationRoutingModule } from './authorization-routing.module';
import { AuthorizationListComponent } from './authorization-list/authorization-list.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';



@NgModule({
  declarations: [AuthorizationListComponent],
  imports: [
    CommonModule,
    AuthorizationRoutingModule,
   
   
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    SharedModule
  ],
  exports:[AuthorizationListComponent]
})
export class AuthorizationModule { }
