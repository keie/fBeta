import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegisterComponent } from './user-register.component';
import { UserRegisterRoutingModule } from './user-register-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import {MatCheckboxModule} from '@angular/material/checkbox';


import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';


@NgModule({
  declarations: [UserRegisterComponent],
  imports: [
    CommonModule,
    UserRegisterRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    MatCheckboxModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    
 ],
  exports:[UserRegisterComponent,FormsModule]
})
export class UserRegisterModule { }
