import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { Emitters } from './emitters/auth';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private dataService: DataService,
    private auth: AuthService,
    private route: ActivatedRoute,
    public jwtHelper: JwtHelperService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('access_token');
    if (!this.jwtHelper.isTokenExpired(token)) {
      localStorage.setItem('role', 'user');
    }
  }
}
