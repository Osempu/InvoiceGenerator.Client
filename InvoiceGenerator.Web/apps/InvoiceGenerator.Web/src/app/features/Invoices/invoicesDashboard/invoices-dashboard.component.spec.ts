import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoicesDashboardComponent } from './invoices-dashboard.component';

describe('InvoicesDashboardComponent', () => {
  let component: InvoicesDashboardComponent;
  let fixture: ComponentFixture<InvoicesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoicesDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoicesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
