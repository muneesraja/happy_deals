import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from '../models/User';
import { AuthService } from '../services/auth.service';
import { Emitters } from '../emitters/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}
  token: any;
  login: boolean = true;
  errorMsg: any = false;
  users: user = {
    email: '',
    password: '',
  };

  ngOnInit() {}
  onSubmit(e) {
    this.auth.loginUser(this.users).subscribe(
      (data) => {
        localStorage.setItem('access_token', data.access_token);
        this.router.navigate(['/']);
      },
      (err) => {
        this.errorMsg = err.error.message;
        console.log(this.errorMsg);
        setTimeout(() => {
          this.errorMsg = false;
        }, 3000);
      }
    );

    e.form.reset();
  }
}
