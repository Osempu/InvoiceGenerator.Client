import { CustomerService } from './../../../core/services/customer.services';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ChangeDetectionStrategy, Component, DestroyRef, input, OnInit, signal } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Customer } from "src/app/core/models/customers.model";
import { ActivatedRoute } from "@angular/router";

// PrimeNG Modules
import { PanelModule } from 'primeng/panel'
import { ButtonModule } from "primeng/button";
import { FieldsetModule } from 'primeng/fieldset';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MenuItem } from 'primeng/api';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
    selector: 'app-customer-details',
    standalone: true,
    templateUrl: './customerDetails.component.html',
    styleUrl: './customerDetails.component.css',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FloatLabelModule,
        ButtonModule,
        FieldsetModule,
        PanelModule,
        TieredMenuModule,
        DialogModule,
        InputTextModule,
        InputTextareaModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CustomerDetailsComponent implements OnInit{
  protected items: MenuItem[] | undefined;
  customer = signal<Customer | null>(null);
  customerEditFormvisible = signal(false);
  addressEditFormvisible = signal(false);
  customerForm: FormGroup;
  customerId = input.required<string>();

  constructor(
    private customerService: CustomerService,
    private destroyref: DestroyRef,
    private route: ActivatedRoute,
    private fb: FormBuilder)
    {
      this.customerForm = this.fb.group({
        name: new FormControl('', {
          validators: [Validators.required, Validators.maxLength(50)]
        }),
        description: new FormControl('', {
          validators: [Validators.required, Validators.maxLength(100)]
        }),
        addresses: this.fb.array([this.createAddressFormGroup()])
      })
    }

  private createAddressFormGroup(): FormGroup {
    return this.fb.group({
      street: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      addressType: new FormControl('', [Validators.required]),
    });
  }

  get addresses(): FormArray {
    return this.customerForm.get('addresses') as FormArray;
  }

  addAddresses(): void {
    this.addresses.push(this.createAddressFormGroup());
  }

  removeAddress(index: number): void {
    this.addresses.removeAt(index);
  }

  ngOnInit(): void {
    if (this.customerId) {
      this.customerService.fetchCustomer(Number(this.customerId())).subscribe({
        next: () => {
          this.customer.set(this.customerService.currentCustomer());
          console.log(this.customer()?.addresses);
        },
        error: (error) => {
          console.log(error);
        }
      });

      this.items = [
        {
          label: 'Ver',
          icon: 'pi pi-eye',
        },
        {
          label: 'Actualizar',
          icon: 'pi pi-pencil',

          command: () => {
            console.log(this.customer());
          },
        },
        {
          label: 'Borrar',
          icon: 'pi pi-trash',
          command: () => {
            // this.deleteCustomer(this.customer() as Customer);
          },
        },
      ];
    }
  }

  showCustomerEditForm() {
    this.customerEditFormvisible.set(true);
  }

  showAddressEditForm() {
    this.addressEditFormvisible.set(true);
  }

  onSubmit() {
    console.log(this.customerForm.value);
    this.customerEditFormvisible.set(false);
  }
}
