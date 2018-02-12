import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { User } from './user/user';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public router: Router) {}
  canActivate(): boolean {
      let js:User=JSON.parse(localStorage.getItem('currentUser'));
    console.log(localStorage.getItem('currentUser'));
    if(localStorage.getItem('currentUser')!=null&&JSON.parse(localStorage.getItem('currentUser')).role==='ADMIN'){
        return true;
    }
    else (localStorage.getItem('currentUser')===null)
    {
      this.router.navigate(['/index']);
      return false;
    }
  }
}