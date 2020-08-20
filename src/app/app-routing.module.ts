import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import {Routes,RouterModule} from '@angular/router';
import { LogoutComponent } from './components/logout/logout.component';

const appRoutes:Routes=[
  {
    path:'login',
    component:LoginComponent
  },
  {
    path: 'home',
    loadChildren: () => import('./components/home-admin/home-admin.module').then(m => m.HomeAdminModule),
    pathMatch:'full',
  },
  {
    path: 'users',
    loadChildren: () => import('./components/user/user.module').then(m => m.UserModule),
    pathMatch:'full',
  },
  {
    path: 'access',
    loadChildren: () => import('./components/access/access.module').then(m => m.AccessModule),
    pathMatch:'full',
  },
  {
    path: 'employee',
    loadChildren: () => import('./components/employee/employee.module').then(m => m.EmployeeModule),
    pathMatch:'full',
  },
  {
    path: 'increase',
    loadChildren: () => import('./components/increase/increase.module').then(m => m.IncreaseModule),
    pathMatch:'full',
  },
  {
    path: 'grade',
    loadChildren: () => import('./components/grade/grade.module').then(m => m.GradeModule),
    pathMatch:'full',
  },
  {
    path: 'scale',
    loadChildren: () => import('./components/scale/scale.module').then(m => m.ScaleModule),
    pathMatch:'full',
  },
  {
    path: 'comission',
    loadChildren: () => import('./components/comission/comission.module').then(m => m.ComissionModule),
    pathMatch:'full',
  },
  {
    path: 'authorization',
    loadChildren: () => import('./components/authorization/authorization.module').then(m => m.AuthorizationModule),
    pathMatch:'full',
  },
  {
    path: 'registerUser',
    loadChildren: () => import('./components/user/user-register/user-register.module').then(m => m.UserRegisterModule),
    pathMatch:'full',
  }, 
  {
    path: 'registerPass',
    loadChildren: () => import('./components/user/user-pass/user-pass.module').then(m => m.UserPasswordModule),
    pathMatch:'full',
  },
  {
    path: 'loginPass',
    loadChildren: () => import('./components/login/pass-login/pass-login.module').then(m => m.PassLoginModule),
    pathMatch:'full',
  },
  {
    path: 'registerView',
    loadChildren: () => import('./components/user/user-view/user-view.module').then(m => m.UserViewModule),
    pathMatch:'full',
  },
  {
    path: 'registerIncrease',
    loadChildren: () => import('./components/increase/increase-register/increase-register.module').then(m => m.IncreaseRegisterModule),
    pathMatch:'full',
  },

  {
    path:'',
    redirectTo:'/login',
    pathMatch:'full'
  },
  {
    path:'logout',
    component:LogoutComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
