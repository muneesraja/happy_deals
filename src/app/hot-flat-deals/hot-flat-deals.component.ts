import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hot-flat-deals',
  templateUrl: './hot-flat-deals.component.html',
  styleUrls: ['./hot-flat-deals.component.css'],
})
export class HotFlatDealsComponent implements OnInit {
  constructor(private router: Router, private dataService: DataService) {}
  deals: any;
  displayDeals: any = [];
  ngOnInit(): void {
    this.dataService.getUserData().subscribe((data) => {
      this.deals = data.deals.map((data) => {
        return {
          percentage: (100 - (data.special_price / data.price) * 100).toFixed(
            1
          ),
          id: data.id,
        };
      });
      this.deals.sort(function (a, b) {
        return b.percentage - a.percentage;
      });
      this.deals = this.deals.slice(0, 3);
    });
  }

  percentageClick(data): Observable<any> {
    this.router.navigate(['/explore'], { queryParams: { percentage: data } });
    return data;
  }
}
