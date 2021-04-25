import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '../../models/Store';
import { AdminService } from '../../services/admin.service';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-admin-add-store',
  templateUrl: './admin-add-store.component.html',
  styleUrls: ['./admin-add-store.component.css'],
})
export class AdminAddStoreComponent implements OnInit {
  errorMsg: any = false;
  successMsg: any = false;
  queryStore: any = false;
  store: Store = {
    name: '',
    status: 1,
    country: 91,
    rating: 4,
    image: '',
  };

  constructor(
    private adminService: AdminService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataServices: DataService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((data) => {
      this.dataServices.getStores().subscribe((stores) => {
        stores.Stores.forEach((store) => {
          if (data.id == store.id) {
            this.queryStore = true;
            this.store = store;
          }
        });
      });
    });
  }
  onSubmit(e) {
    if (this.queryStore) {
      this.adminService.updateStore(this.store).subscribe(
        (data) => {
          if (data) {
            this.successMsg = `The Store ${data.name} has been successfully Updated`;
            setTimeout(() => {
              this.router.navigate(['/admin']);
            }, 3000);
          }
        },
        (err) => {
          if (err) {
            this.successMsg = 'Something went wrong';
            setTimeout(() => {
              this.router.navigate(['/admin']);
            }, 3000);
          }
        }
      );
      return console.log('User Query');
    }
    this.adminService.addStore(this.store).subscribe(
      (data) => {
        if (data.message) {
          this.successMsg = `The Store ${data.stores.name} has been successfully added`;
          setTimeout(() => {
            this.router.navigate(['/admin']);
          }, 3000);
        }
      },
      (err) => {
        if (err) {
          this.successMsg = 'Something went wrong';
          setTimeout(() => {
            this.router.navigate(['/admin']);
          }, 3000);
        }
      }
    );
    e.form.reset();
  }
}
