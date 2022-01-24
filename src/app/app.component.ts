import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-money';
  userName:string|null = ""

  constructor(private router: Router, private authService: AuthService){
    this.setUserName()
  }

  ngOnInit() {
    // this.router.navigate(['/login']);
  }

  getUserName():string | null{
    if(this.isAuthenticated()){
      return this.authService.getUserName();
    }
    else
    return "null"
  }

  setUserName(){
    this.userName = this.getUserName();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  
}
