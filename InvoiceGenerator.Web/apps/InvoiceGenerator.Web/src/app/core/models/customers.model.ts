import { Invoice } from "./invoice.model";

export interface Customer {
  id: number;
  name: string | null | undefined;
  description: string | null | undefined;
  addresses: Address[] | null;
  invoices: Invoice[] | null;
}

export interface Address {
  id: number;
  street: string;
  street2: string | null;
  postalCode: string;
  state: string;
  city: string;
  country: string;
  addressType: string;
  customerId: number;
  customer: Customer | null;
}
