import { Component, OnInit } from '@angular/core';
import { Emitters } from '../../emitters/auth';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css'],
})
export class AdminNavComponent implements OnInit {
  authenticated: any = false;
  constructor() {}

  ngOnInit(): void {
    const role = localStorage.getItem('role');
    if (role == 'admin') {
      this.authenticated = true;
    }
  }
  logout() {
    localStorage.clear();
    window.location.reload();
  }
}
