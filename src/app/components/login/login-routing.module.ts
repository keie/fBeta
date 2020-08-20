import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes,RouterModule} from '@angular/router';
import { LoginComponent } from './login.component';

const loginRoutes : Routes=[
  {
    path:'',
    component:LoginComponent,
    pathMatch: 'full'
  }
];


@NgModule({
  declarations: [],
  imports: [
    
    RouterModule.forChild(loginRoutes)
  ],
  exports:[RouterModule]
})
export class LoginRoutingModule { }
