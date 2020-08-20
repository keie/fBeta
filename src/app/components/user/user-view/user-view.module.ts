import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserViewComponent } from './user-view.component';
import { UserViewRoutingModule } from './user-view-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import {MatCheckboxModule} from '@angular/material/checkbox';


import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';


@NgModule({
  declarations: [UserViewComponent],
  imports: [
    CommonModule,
    UserViewRoutingModule,
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
  exports:[UserViewComponent,FormsModule]
})
export class UserViewModule { }
