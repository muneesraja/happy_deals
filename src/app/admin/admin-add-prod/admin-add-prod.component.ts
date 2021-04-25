import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { DataService } from '../../services/data.service';
import { AdminService } from '../../services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-add-prod',
  templateUrl: './admin-add-prod.component.html',
  styleUrls: ['./admin-add-prod.component.css'],
})
export class AdminAddProdComponent implements OnInit {
  errorMsg: any = false;
  existingStore: any;
  successMsg: any = false;
  headline: String;
  dt = new Date();
  queryProduct: any = false;
  product: Product = {
    name: '',
    price: null,
    description: '',
    image: '',
    url: '',
    coupon: '',
    special_price: null,
    store_id: null,
    expires_on: null,
    viewed: 1,
    created_by: 1,
    reviewed_by: 1,
    status: 1,
    rating: 4,
    offer_type: null,
  };
  constructor(
    private dataServices: DataService,
    private router: Router,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((data) => {
      this.dataServices.getUserData().subscribe((products) => {
        products.deals.forEach((product) => {
          if (product.id == data.id) {
            this.queryProduct = true;
            this.product = product;
          }
        });
      });
    });

    this.dt.setMonth(this.dt.getMonth() + 1);
    this.product.expires_on = `${this.dt.getFullYear()}-${this.dt.getMonth()}-${this.dt.getDate()}`;

    if (this.router.url == '/admin/product') {
      this.headline = 'Add Product';
    }
    if (this.router.url == '/admin/product_update') {
      this.headline = 'Edit Product';
    }
    this.dataServices.getStores().subscribe((data) => {
      this.existingStore = data.Stores;
    });
  }
  onSubmit(e) {
    if (this.queryProduct) {
      this.adminService.updateProduct(this.product).subscribe(
        (data) => {
          if (data) {
            this.successMsg = `The Product ${data.name} has been successfully Updated`;
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
      return console.log('query received');
    }

    this.product.store_id = parseInt(this.product.store_id);
    this.adminService.addProduct(this.product).subscribe(
      (data) => {
        console.log(data);
        if (data.message) {
          this.successMsg = `The Product ${data.deals.name} has been successfully added`;
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
