import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Customer } from "../models/customers.model";
import { catchError, tap, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class CustomerService {
  private _customers = signal<Customer[]>([]);
  customers = this._customers.asReadonly();
  private _currentCustomer = signal<Customer | null>(null);
  currentCustomer = this._currentCustomer.asReadonly();

  constructor(private httpClient: HttpClient){}

  fetchAllCustomers() {
    return this.httpClient.get<Customer[]>('https://localhost:7062/api/customers')
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(() => new Error(error))
      }),
      tap({
        next: (customers) => {
            this._customers.set(customers);
        }
      }));
  }

  fetchCustomerNew(id: number) {
    return this.httpClient.get<Customer>(`https://localhost:7062/api/customers/${id}`)
      .subscribe({
        next: (customer) => console.log(customer),
        error: (error) => console.log(error),
        complete: () => console.log('Fetch Customer New has been completed')
      });
  }

  fetchCustomer(id: number) {
    return this.httpClient.get<Customer>(`https://localhost:7062/api/customers/${id}`)
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(() => new Error(error));
        }),
        tap({
          next: (customer) => {
            console.log(customer);
            this._currentCustomer.set(customer);
          }
        }));
  }

  createCustomer(customer: Customer) {
    const prevCustomers = this._customers();

    if(!prevCustomers.some(c => c.id === customer.id)){
      this._customers.set([...prevCustomers, customer]);
    }

    return this.httpClient.post('https://localhost:7062/api/customers', customer)
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(() => new Error(error));
        }),
        tap({
          next: (customer) => {
            console.log("Created customer: ", customer);
          }
        }));
  }

  updateCustomer(customer: Customer) {
    return this.httpClient.put(`https://localhost:7062/api/customers/${customer.id}`, customer)
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(() => new Error(error));
        }),
        tap({
          next: (customer) => {
            console.log("Updated customer: ", customer);
          }
        }));
  }

  deleteCustomer(customer: Customer) {
    const prevCustomers = this._customers();

    if(prevCustomers.some(c => c.id === customer.id)){
      this._customers.set(prevCustomers.filter(c => c.id !== customer.id));
    }

    return this.httpClient.delete(`https://localhost:7062/api/customers/${customer.id}`)
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(() => new Error(error));
        }));
  }
}
