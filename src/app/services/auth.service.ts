import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuth: boolean;

  constructor(public router: Router) {
    this.isAuth = false;
  }

  public login(): void {
    setTimeout(() => {
      this.isAuth = true;
      this.router.navigate(['todolist'])
    }, 2000)
  }

  public logout(): void {
    setTimeout(() => {
      this.isAuth = false;
      this.router.navigate(['home'])
    }, 2000)
  }
}
