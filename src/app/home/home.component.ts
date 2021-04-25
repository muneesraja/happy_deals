import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  authenticated: any;
  constructor() {}

  ngOnInit(): void {
    Emitters.authEmitter.subscribe((data) => {
      this.authenticated = data.name;
    });
  }
}
