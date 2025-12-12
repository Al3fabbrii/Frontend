import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [MatIcon, MatToolbar, MatButton, MatToolbarRow],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private router = inject(Router);

  goToCheckout(): void {
    // Logic to navigate to the checkout page
    this.router.navigate(['/checkout']);
  }

  goToHome(): void {
    // Logic to navigate to the home page
    this.router.navigate(['/']);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }


}
