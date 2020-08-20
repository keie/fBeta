import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPasswordComponent } from './user-pass.component';
import { UserPasswordRoutingModule } from './user-pass-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MaterialModule } from '../../material/material.module';

import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';


@NgModule({
  declarations: [UserPasswordComponent],
  imports: [
    CommonModule,
    UserPasswordRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    MatFormFieldModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    
 ],
  exports:[UserPasswordComponent,FormsModule]
})
export class UserPasswordModule { }
