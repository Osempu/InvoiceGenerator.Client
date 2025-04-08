import { CustomerService } from 'src/app/core/services/customer.services';
import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { Customer } from '../../../core/models/customers.model';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// PrimeNG Modules
import { MultiSelectModule } from 'primeng/multiselect';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TagModule } from 'primeng/tag';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-customers-page',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TagModule,
    InputIconModule,
    IconFieldModule,
    ButtonModule,
    MultiSelectModule,
    RippleModule,
    RouterLink,
    TieredMenuModule],
  templateUrl: './customers-page.component.html',
  styleUrl: './customers-page.component.css'
})

export class CustomersPageComponent implements OnInit{
  currentCustomer = this.customerService.currentCustomer;
  searchValue = signal<string | undefined>(undefined);
  customers = this.customerService.customers;
  protected items: MenuItem[] | undefined;
  isFetching = signal(false);

  constructor(private httpClient: HttpClient, private destroyref: DestroyRef, private customerService: CustomerService, private router: Router) {}

  ngOnInit(): void {
    this.getAllCustomers();

    this.items = [{
      label: 'Actualizar',
      icon: 'pi pi-pencil',
      command: () => {
        this.router.navigate(['customers/edit/', this.currentCustomer()?.id]);
      }
    },
    {
      label: 'Borrar',
      icon: 'pi pi-trash',
      command: () => {
        this.deleteCustomer(this.currentCustomer() as Customer);
      }
    }]
  }

  getAllCustomers() {
    this.isFetching.set(true);
    const subscription = this.customerService.fetchAllCustomers()
      .subscribe({
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this.isFetching.set(false);
        }
      });
    this.destroyref.onDestroy(() => subscription.unsubscribe());
  }

  getCustomer(id: number) {
    const subscription = this.customerService.fetchCustomer(id)
      .subscribe({
        error: (error) => {
          console.log("Single customer Error: "+ error);
        }
      });
      this.destroyref.onDestroy(() => subscription.unsubscribe());
  }

  addCustomer() {
    const customer: Customer = { id: 10, name: "New Customer", description: "El Customero", addresses: null, invoices: null };
    const subscription = this.customerService.createCustomer(customer)
      .subscribe({
        error: (error) => {
          console.log("Error creating customer: " + error);
        }
      });
      this.destroyref.onDestroy(() => subscription.unsubscribe());
  }

  updateCustomer(customer: Customer) {
    const subscription = this.customerService.updateCustomer(customer)
      .subscribe({
        error: (error) => {
          console.log("Error updating customer: " + error);
        }
    });
    this.destroyref.onDestroy(() => subscription.unsubscribe());
  }

  deleteCustomer(customer: Customer) {
    const subscription = this.customerService.deleteCustomer(customer)
      .subscribe({
        error: (error) => {
          console.log("Error deleting customer: ",error);
        }
      });
      this.destroyref.onDestroy(() => subscription.unsubscribe());
    }

  clear(table: Table) {
    table.clear();
    this.searchValue.set('');
  }
}
