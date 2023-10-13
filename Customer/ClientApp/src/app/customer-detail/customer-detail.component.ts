import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent {
  customer: Customer | undefined;
  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getCustomer();
  }

  goBack(): void { this.location.back(); }

  save(customer: Customer): void
  {
    if (customer.email != "") {
      this.customerService.updateCustomer(customer)
        .subscribe(() => this.goBack());
      }
  }

  getCustomer(): void {
    const id = this.route.snapshot.paramMap.get('customerId');
    console.log("ID->" + id);
    if (id != null) {
    this.customerService.getCustomer(id)
      .subscribe({
        next: data => {
          this.customer = data;
          console.log(JSON.stringify(this.customer));
        },
        error: error => {
          console.error('There was an error!', error);
        }
      });
    }
  }
}
