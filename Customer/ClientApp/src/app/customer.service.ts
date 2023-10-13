import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Customer} from './customer'; 

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url = 'https://getinvoices.azurewebsites.net/api';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.url}/Customers`, this.httpOptions);
  }

  getCustomer(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.url}/Customer/${id}`, this.httpOptions);
  }

  deleteCustomer(id: string): Observable<Customer> {
    return this.http.delete<Customer>(`${this.url}/Customer/${id}`, this.httpOptions);
  }

  updateCustomer(customer: Customer): Observable<any> {
    return this.http.post<Customer>(`${this.url}/Customer/${customer.id}`, customer, this.httpOptions);
  }

  addCustomer(customer: Customer): Observable<Customer> {

    console.log("service ==> " + JSON.stringify(customer));
    return this.http.post<Customer>(`${this.url}/Customer`, customer, this.httpOptions);
  }
}
