import { NgModule } from '@angular/core';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from './logout/logout.component';
import { SpinnerComponent } from './spinner/spinner.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MaterialModule } from './material/material.module';
import {MatCardModule} from '@angular/material/card';

import { PlantasComponent } from './plantas/plantas.component';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    BreadcrumbComponent,
    FooterComponent,
    LoginComponent,
    LogoutComponent,
    SpinnerComponent,
    PlantasComponent
    

  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatCheckboxModule
  ],
  providers:[{ provide: APP_BASE_HREF, useValue: '' }],
  exports:[
    NavbarComponent,
    SidebarComponent,
    BreadcrumbComponent,
    FooterComponent,
    SpinnerComponent,
    LoginComponent,
    PlantasComponent,
    MatCheckboxModule
  ]
})
export class SharedModule { }
