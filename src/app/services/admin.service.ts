import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '../models/Store';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}
  rootURL: string = 'http://3.19.63.145/dealsandcompare/API/public/api/';
  // Store
  addStore(store: Store): Observable<any> {
    return this.http.post(this.rootURL + 'stores', store);
  }

  deleteStore(id: number): Observable<any> {
    return this.http.delete(this.rootURL + 'stores/' + id);
  }

  updateStore(store): Observable<any> {
    return this.http.put(this.rootURL + 'stores/' + store.id, store);
  }

  // Deals
  addProduct(product: Product): Observable<any> {
    let httpHeader = new HttpHeaders();
    httpHeader = httpHeader.set('Accept', 'application/json');
    return this.http.post(this.rootURL + 'deals', product, {
      headers: httpHeader,
    });
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(this.rootURL + 'deals/' + id);
  }

  updateProduct(product): Observable<any> {
    return this.http.put(this.rootURL + 'deals/' + product.id, product);
  }
}
