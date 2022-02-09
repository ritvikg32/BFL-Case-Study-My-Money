import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import {AuthService} from '../service/auth.service'
import { User } from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isEmailInvalid = false;
  isPwdInvalid = false;
  email = ""
  password = ""
  authFailed = false


  // loginBtn = document.getElementById('login-btn') as HTMLInputElement;


  // manageBtn(){
  //   this.isEmailInvalid = this.userEmails.get('email')!.invalid && this.userEmails.get('email')!.touched

  //   this.isPwdInvalid = this.userEmails.get('password')!.invalid && this.userEmails.get('password')!.touched

  //   this.loginBtn!.disabled = this.isEmailInvalid || this.isPwdInvalid
  //   this.loginBtn!.disabled = true
  // }



  

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  login(){
    this.authFailed=false;
    this.authService.login(this.email, this.password).subscribe(
      (data: any) => {
        console.log('login successful');
        console.log('Login user id is ' + data.userId);
        
        this.authService.getUserData(data.userId)
        
      },
      (err: any) => {
        this.authFailed = true;
      }
    )
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  userEmails = new FormGroup({
    email: new FormControl('',[
      Validators.required, 
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
    password: new FormControl('',[
      Validators.required, 
      Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
    ])
  });

}
