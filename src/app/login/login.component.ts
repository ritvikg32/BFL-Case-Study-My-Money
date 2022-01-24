import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import {AuthService} from '../service/auth.service'

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


  loginBtn = document.getElementById('login-btn') as HTMLInputElement;


  manageBtn(){
    this.isEmailInvalid = this.userEmails.get('email')!.invalid && this.userEmails.get('email')!.touched

    this.isPwdInvalid = this.userEmails.get('password')!.invalid && this.userEmails.get('password')!.touched

    this.loginBtn!.disabled = this.isEmailInvalid || this.isPwdInvalid
    this.loginBtn!.disabled = true
  }



  

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  login(){
    if(this.authService.login(this.email, this.password)){
      this.router.navigateByUrl('/home')
    }
    else{
      alert('Login Failed! Please check your credentials and try again.')
    }
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
