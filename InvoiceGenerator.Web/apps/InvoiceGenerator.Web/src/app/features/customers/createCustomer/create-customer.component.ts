import { Component, DestroyRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Customer } from 'src/app/core/models/customers.model';
import { CustomerService } from 'src/app/core/services/customer.services';

@Component({
  selector: 'app-create-customer',
  standalone: true,
  imports: [CommonModule,ButtonModule, ReactiveFormsModule],
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.css',
})

export class CreateCustomerComponent{
  customer = signal<Customer | null>(null);

  constructor(private customerService: CustomerService, private destroyref: DestroyRef) {}

  form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(50)]
    }),
    description: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(100)]
    }),
  })

  onSubmit(): void {
    const newCustomer: Customer = {id: 0,name: this.form.get('name')?.value, description: this.form.get('description')?.value, addresses: null, invoices: null};
    const subscription = this.customerService.createCustomer(newCustomer).subscribe({
      error: (error) => {
        console.log("Error creating customer: " + error);
      }
    });
    this.destroyref.onDestroy(() => subscription.unsubscribe());
  }
}
