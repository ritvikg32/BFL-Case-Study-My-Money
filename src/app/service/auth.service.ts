import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { User } from '../model/user';
import { Router } from '@angular/router';


const BASE_URL = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  user: User | null = null;
  currentUser: User | null = null;
  newUser:User | null = null;
  userUpdated = new EventEmitter();

  

  constructor(private router: Router, private http: HttpClient) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.currentUser == null) {
      this.router.navigateByUrl('/login');
    }

    return this.isAuthenticated();
  }

  

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  register(
    name: string,
    email: string,
    password: string,
    phoneNumber: string
  ): Observable<any> {

    this.newUser = new User(name, email, password, phoneNumber)

    console.log('Phone number is ' + phoneNumber);
    

    let result = this.http.post(
      BASE_URL + 'user',
      this.newUser,
      { responseType: 'json' }
    );

    return result
  }

  submitUserAuthData(userId:number):Observable<any> {
    this.newUser!.userId = userId
    return this.http.post(BASE_URL + 'register', this.newUser, {responseType: 'json'})
  }

  


  userExists(email: string): boolean {
    const localPwd: string | null = localStorage.getItem(email + '_auth');

    return localPwd != null && localPwd.length == 0;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      BASE_URL + 'login',
      { email: email, password: password },
      { responseType: 'json' }
    );
  }


  getUserData(userId:number){

    let result = this.http.get(BASE_URL + 'user/' + userId, {
      responseType: 'json',
    });

    result.subscribe(
      (data: any) => {
        let userJSON = data[0]
        this.currentUser = new User(
          userJSON.NAME,
          userJSON.EMAIL,
          "",
          userJSON.PHONENO
        );
        this.currentUser.userId = userId;
        this.userUpdated.emit()
        this.router.navigateByUrl('/home');
      },
      (err: any) => {
        console.log('Error fetching user details...');
      }
    );
  }

  getUserName(): string | null {
    if (this.isAuthenticated()) return this.currentUser!.name;
    else return null;
  }

  logout() {
    this.currentUser = null;
  }
}
