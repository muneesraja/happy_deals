import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  authenticated: any;
  diff_routes: object = {};
  constructor() {}

  ngOnInit(): void {
    const role = localStorage.getItem('role');
    if (role == 'user') {
      this.authenticated = true;
    }
  }

  logout() {
    localStorage.clear();
    window.location.reload();
  }

  showSimpleAnim() {
    const anim = document.getElementById('animation');
    anim.style.display = 'grid';
    setTimeout(() => {
      anim.style.display = 'none';
    }, 700);
  }
}
