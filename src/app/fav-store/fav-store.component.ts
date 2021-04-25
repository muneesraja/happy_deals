import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-fav-store',
  templateUrl: './fav-store.component.html',
  styleUrls: ['./fav-store.component.css'],
})
export class FavStoreComponent implements OnInit {
  stores: any;
  allowAccess: any = false;
  constructor(
    private dataService: DataService,
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.dataService.getStores().subscribe((data) => {
      if (this.router.url == '/admin') {
        this.allowAccess = true;
      }
      this.stores = data.Stores;
    });
  }

  deleteStore(productID) {
    this.stores = this.stores.filter((e) => {
      return e.id != productID;
    });
    this.adminService.deleteStore(productID).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateStore(store) {
    this.router.navigate(['/admin/store'], { queryParams: { id: store } });
  }

  onStoreClick(data): Observable<any> {
    this.router.navigate(['/explore', data]);
    return data;
  }
}
