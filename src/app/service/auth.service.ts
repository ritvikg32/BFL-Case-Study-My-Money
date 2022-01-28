import { Injectable, EventEmitter } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  user: User | null = null;
  currentUser: User | null = null;
  userUpdated = new EventEmitter();

  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.currentUser == null){
      this.router.navigateByUrl('/login')
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
  ): boolean {
    if (this.userExists(email)) {
      return false;
    }

    localStorage.setItem(email + '_auth', password);

    const userObj = new User(name, email, password, phoneNumber);
    localStorage.setItem(email + '_data', JSON.stringify(userObj));
    return true;
  }

  // getUserCount():number | null{

  //   const  count:string|null = localStorage.getItem('user_count')

  //   return +count!
  // }

  userExists(email: string): boolean {
    const localPwd: string | null = localStorage.getItem(email + '_auth');

    return localPwd != null && localPwd.length == 0;
  }

  login(email: string, password: string): boolean {
    if (this.userExists(email)) {
      return false;
    }
    const userPwd = localStorage.getItem(email + '_auth');
    if (password == userPwd) {
      const userJSON = localStorage.getItem(email + '_data');
      if (userJSON !== null) {
        this.currentUser = JSON.parse(userJSON);
        this.userUpdated.emit()
        return true;
      }
    }

    return false;
  }

  getUserName(): string | null {
    if(this.isAuthenticated())
      return this.currentUser!.name;
    else
    return null;
  }

  logout(){
    this.currentUser = null;
  }
}
