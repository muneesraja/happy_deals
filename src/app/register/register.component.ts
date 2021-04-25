import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { regUser } from '../models/User';
import { AuthService } from '../services/auth.service';
import { Emitters } from '../emitters/auth';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {}
  token: any;
  confirm_pass: boolean = false;
  errorMsg: any = false;
  regSuccess: any = false;
  users: regUser = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };
  conf_password: String = '';
  ngOnInit(): void {}

  onSubmit(e) {
    this.auth.registerUser(this.users).subscribe(
      (data) => {
        this.regSuccess = data.message + ' please login!';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3200);
      },
      (err) => {
        console.log(err);
        this.errorMsg = err.error.errors[0].msg;
        setTimeout(() => {
          this.errorMsg = false;
        }, 3000);
      }
    );
    e.form.reset();
  }

  checkPass(e) {
    if (e.target.value == this.users.password) {
      return (this.confirm_pass = false);
    }
    this.users.password_confirmation = this.users.password;
    this.confirm_pass = true;
  }
}
