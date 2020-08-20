import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncreaseRegisterComponent } from './increase-register.component';
import { IncreaseRegisterRoutingModule } from './increase-register-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';

import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';


@NgModule({
  declarations: [IncreaseRegisterComponent],
  imports: [
    CommonModule,
    IncreaseRegisterRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    
 ],
  exports:[IncreaseRegisterComponent,FormsModule]
})
export class IncreaseRegisterModule { }
