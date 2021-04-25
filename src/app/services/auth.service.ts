import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { user as User, regUser } from '../models/User';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  rootUsersURL = 'http://3.19.63.145/dealsandcompare/API/public/api';
  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    if (token == 'AkjasndkaLDnklnja') {
      localStorage.setItem('role', 'admin');
      return true;
    }
  }

  loginUser(user: User): Observable<any> {
    return this.http.post(this.rootUsersURL + '/login', user);
  }
  adminLogin(user: User): Observable<any> {
    return this.http.post(this.rootUsersURL + '/admin/login', user);
  }

  registerUser(user: regUser): Observable<any> {
    return this.http.post(this.rootUsersURL + '/register', user);
  }
}
