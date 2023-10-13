import { Component } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent {
  public customers: Customer[] = [];

  constructor(private customerService: CustomerService) {
    this.getCustomers();
  }

  getCustomers(): void {
    this.customerService.getCustomers()
      .subscribe({
        next: data => {
          this.customers = data;
        },
        error: error => {
          console.error('There was an error!', error);
        }
      });
  }

  delete(customer: Customer) {
    this.customerService.deleteCustomer(customer.id).subscribe();
    this.customers = this.customers.filter(c => c !== customer);
    console.log("Delete" + customer.id);
  }
}
