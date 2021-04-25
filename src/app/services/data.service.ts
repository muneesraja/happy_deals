import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  rootURL: string = 'http://3.19.63.145/dealsandcompare/API/public/api/';
  getUserData(): Observable<any> {
    return this.http.get(this.rootURL + 'deals');
  }
  getStores(): Observable<any> {
    return this.http.get(this.rootURL + 'stores');
  }
}
