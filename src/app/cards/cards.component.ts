import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/auth';
import { dealEmitters, percentageEmitters } from '../emitters/deals';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  authenticated: any;
  deals: any;
  allowAccess: boolean = false;
  dealBack: any;
  filterByStore: any;
  filterByPercent: any;
  searchBox: any;
  enableSearch: boolean = true;

  constructor(
    private router: Router,
    private dataServices: DataService,
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    // Check User Logged IN
    const role = localStorage.getItem('role');
    if (role == 'user') {
      this.authenticated = true;
    }

    // For allowing admin for modify access

    Emitters.authEmitter.subscribe((data) => {
      this.authenticated = data;
    });
    this.dataServices.getUserData().subscribe(
      (data) => {
        if (this.router.url == '/admin') {
          this.allowAccess = true;
        }
        if (this.router.url == '/' || this.router.url == '/#scroll') {
          this.enableSearch = false;
          return (this.deals = data.deals.filter((data, index) => {
            return index < 3;
          }));
        }
        if (this.filterByStore) {
          return (this.deals = data.deals.filter((data) => {
            return data.store_id == this.filterByStore;
          }));
        }
        if (this.filterByPercent) {
          return (this.deals = data.deals.filter((data) => {
            return data.id == this.filterByPercent;
          }));
        }
        this.dealBack = data.deals;
        return (this.deals = data.deals);
      },
      (err) => {
        this.deals = false;
      }
    );
    // For Filtering by percentage
    this.route.queryParams.subscribe((id) => {
      this.filterByPercent = id.percentage;
    });
    // For Filtering by Store ID
    this.route.params.subscribe((data) => {
      this.filterByStore = data.store;
    });
  }

  calcDiscount(price, spl_price) {
    const disc = (100 - (spl_price / price) * 100).toFixed(1);
    return disc;
  }
  // Admin Access
  deleteProduct(productID) {
    this.deals = this.deals.filter((e) => {
      return e.id != productID;
    });
    this.adminService.deleteProduct(productID).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // Update Product
  updateProduct(deal) {
    this.router.navigate(['/admin/product'], { queryParams: { id: deal.id } });
  }

  // Search Deals
  searchInput(e) {
    this.searchBox = e.target.value;
    this.deals = this.dealBack.filter((deal) => {
      return deal.name.toLowerCase().includes(this.searchBox.toLowerCase());
    });
  }

  redirect() {
    if (this.authenticated) {
      window.open(
        'https://www.flipkart.com/woodness-stella-solid-wood-dining-chair/p/itmfbmp4fknmjhx3?pid=DNCFBMCFFSF7JQ9N&lid=LSTDNCFBMCFFSF7JQ9N49BQYP&marketplace=FLIPKART&q=chair+wood&store=wwe&spotlightTagId=BestvalueId_wwe&srno=s_1_11&otracker=search&otracker1=search&fm=SEARCH&iid=0451401c-e9ee-4716-8810-ceea9acb6a35.DNCFBMCFFSF7JQ9N.SEARCH&ppt=sp&ppn=sp&ssid=rzvpooud340000001618242011842&qH=14e37dbabf2c3424',
        '_blank'
      );
      return this.router.navigateByUrl('https://www.google.com');
    }
    return this.router.navigate(['/login']);
  }
}
