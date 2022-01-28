import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  name: string = '';
  phoneNo: string = '';
  email: string = '';
  password: string = '';
  invalidState = true;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  ngOnChanges(){
    let validationFailed =
      this.userEmails.get('name')?.invalid ||
      this.userEmails.get('email')?.invalid ||
      this.userEmails.get('password')?.invalid;

    if(validationFailed || validationFailed==undefined) {
      this.invalidState = true;
    }
    else{
      this.invalidState = false;
    }
  }

  register() {
    if (
      this.authService.register(
        this.name,
        this.email,
        this.password,
        this.phoneNo
      )
    ) {
      this.goToLogin()
    } else {
      alert('Something went wrong. Please try again');
    }
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  userEmails = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]+$'),
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^d+$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
      ),
    ]),
  });
}
