import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessRoutingModule } from './access-routing.module';
import { AccessListComponent } from './access-list/access-list.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';
import { CustomPaginator } from './CustomPaginator';
import { MatPaginatorIntl} from '@angular/material/paginator';


@NgModule({
  declarations: [AccessListComponent],
  imports: [
    CommonModule,
    AccessRoutingModule,
   
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  exports:[AccessListComponent],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }
  ]
})
export class AccessModule { }
