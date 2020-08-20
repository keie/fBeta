import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { HttpClient  } from '@angular/common/http';
declare var require: any


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontVSRL';
/**
 *
 */
  _displayLogin=false;
  constructor(private authService:AuthService, private http:HttpClient) {
  }

  ngOnInit(): void {
    this.authService.authStatus.subscribe(
      authStatus =>{
        const jwt= this.authService.getToken();
        setTimeout(()=>(this._displayLogin=!(jwt==null || jwt===''),0));
      }
    );

  }
  

  get displayNavBar(){
    return this._displayLogin;
  }
  get displaySideBar(){
    return this._displayLogin;
  }
  get displayBreadcrumb(){
    return this._displayLogin;
  }
  get displayFooter(){
    return this._displayLogin;
  }
  get displayHome(){
    return this._displayLogin;
  }

  
}

