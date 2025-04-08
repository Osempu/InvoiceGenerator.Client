import { Address, Customer } from "./customers.model";
import { Item } from "./item.model";

export interface Invoice {
  id: number;
  identifier: string;
  createdAt: string;
  validStartDate: string;
  dueDate: string;
  customerId: number;
  customer: Customer | null;
  invoiceDetails: InvoiceDetails | null;
}

export interface InvoiceDetails {
  id: number;
  subTotal: number;
  tax: number;
  total: number;
  billingAddressId: number;
  billingAddress: Address | null;
  invoiceLineItems: InvoiceLineItem[] | null;
  invoiceId: number;
  // invoice: Invoice | null;
}

export interface InvoiceLineItem {
  id: number;
  quantity: number;
  lineTotal: number;
  itemId: number;
  item: Item | null;
  invoiceDetailsId: number;
  // invoiceDetails: InvoiceDetails | null;
}
