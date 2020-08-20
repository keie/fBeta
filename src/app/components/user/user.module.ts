import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';
import { PasswordReestablishComponent } from './password-reestablish/password-reestablish.component';
import { ProfileComponent } from './profile/profile.component';
import { CustomPaginator } from './user-list/CustomPaginator';
import { MatPaginatorIntl} from '@angular/material/paginator';



@NgModule({
  declarations: [UserListComponent, PasswordReestablishComponent, ProfileComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
   
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  exports:[UserListComponent,ProfileComponent],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }
  ]
})
export class UserModule { }
