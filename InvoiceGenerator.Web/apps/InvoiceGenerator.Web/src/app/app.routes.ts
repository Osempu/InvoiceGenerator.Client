import { Route } from '@angular/router';
import { CustomersPageComponent } from './features/customers/customers-page/customers-page.component';
import { CustomerDetailsComponent } from './features/customers/customerDetails/customerDetails.component';
import { CreateCustomerComponent } from './features/customers/createCustomer/create-customer.component';

export const appRoutes: Route[] = [
  {
    path: '', component: CustomersPageComponent
  },
  {
    path: 'customer/:customerId', component: CustomerDetailsComponent
  },
  {
    path: 'customers/create', component: CreateCustomerComponent
  }
];
