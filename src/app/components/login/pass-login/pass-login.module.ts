import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PassLoginComponent } from './pass-login.component';
import { PassLoginRoutingModule } from './pass-login-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MaterialModule } from '../../material/material.module';

import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';


@NgModule({
  declarations: [PassLoginComponent],
  imports: [
    CommonModule,
    PassLoginRoutingModule,
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
  exports:[PassLoginComponent,FormsModule]
})
export class PassLoginModule { }
