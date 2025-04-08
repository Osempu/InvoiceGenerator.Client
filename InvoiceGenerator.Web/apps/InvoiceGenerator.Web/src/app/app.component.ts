import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { NavbarComponentComponent } from "./shared/components/NavbarComponent/navbarComponent.component";
import { PrimeNGConfig } from 'primeng/api';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, NavbarComponentComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'InvoiceGenerator.Web';

  constructor(private primeNGConfig: PrimeNGConfig) {
    this.primeNGConfig.ripple = true;
  }
}
