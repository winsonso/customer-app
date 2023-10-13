import { Component } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {
  saved = false;
  nextId: number = 0;
  customer: Customer | undefined;
  customerForm = this.formBuilder.group({
    firstname: '',
    lastname: '',
    email: new FormControl("", [Validators.required]),
    phone_Number: '',
    country_code: '',
    gender: '',
    currency: '',
    balance: 0,
  });
  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private location: Location
  ) {
    this.customerService.getCustomers()
      .subscribe({
        next: data => {
          this.nextId = Math.max(...data.map(({ id }) => Number(id))) + 1;
        },
        error: error => {
          console.error('There was an error!', error);
        }
      });
  }

  add(): void {
    this.saved = true;

    let firstname = this.customerForm.value.firstname;
    let lastname = this.customerForm.value.lastname;
    let email = this.customerForm.value.email;
    let phone_Number = this.customerForm.value.phone_Number;
    let country_code= this.customerForm.value.country_code;
    let gender = this.customerForm.value.gender;
    let currency = this.customerForm.value.currency;
    let balance = this.customerForm.value.balance;

    let rowKey = `${this.nextId}`;

    if (this.customerForm.valid) {
      this.customerService.addCustomer({ firstname, lastname, email, phone_Number, country_code, gender, currency, balance, rowKey } as Customer)
      .subscribe(() => this.goBack());
    }
  }

  goBack(): void { this.location.back(); }

  protected get registerFormControl() {
    return this.customerForm.controls;
  }
}
