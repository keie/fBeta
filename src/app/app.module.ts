import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './components/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthHttpInterceptor } from '../app/auth/auth-http-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule
    
  ],
  providers: [AuthService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true

    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
