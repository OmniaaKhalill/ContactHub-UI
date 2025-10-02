import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css'
})
export class NavBar {


 constructor( private router:Router, private authService:AuthService  ){

  }


  logout(){
    this.authService.logout()
    this.router.navigateByUrl("login")
  }


}
