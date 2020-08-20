import { NgModule, CUSTOM_ELEMENTS_SCHEMA, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { MatCheckboxModule } from '@angular/material/checkbox';

import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    
    MatDialogModule,
    MatCheckboxModule,
  ],
  exports:[
    MatToolbarModule,
    MatCheckboxModule,
    ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    }],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA
    ],
    
})
export class ProfileModule { }
