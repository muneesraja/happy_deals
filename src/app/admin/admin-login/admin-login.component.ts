import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from '../../models/User';
import { AuthService } from '../../services/auth.service';
import { Emitters } from '../../emitters/auth';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  errorMsg: any = false;
  users: user = {
    email: '',
    password: '',
  };
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}
  onSubmit(e) {
    this.auth.adminLogin(this.users).subscribe(
      (data) => {
        localStorage.setItem('access_token', data.token);
        this.router.navigate(['/admin']);
      },
      (err) => {
        this.errorMsg = err.error.message;
        setTimeout(() => {
          this.errorMsg = false;
        }, 3000);
      }
    );

    e.form.reset();
  }
}
