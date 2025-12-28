import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { OrderService } from '../../../core/services/order-service';
import { AuthService } from '../../../core/services/auth-service';
import { Order, OrderItem } from '../../../core/models/order';
import { Product } from '../../../core/models/product';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';
import { RouterLink, NavigationEnd, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-area-page',
  imports: [CommonModule, MatCardModule, MatButtonModule, CurrencyPipe, RouterLink],
  templateUrl: './user-area-page.html',
  styleUrl: './user-area-page.scss',
})
export class UserAreaPage implements OnInit, OnDestroy {
  private orderService = inject(OrderService);
  private router = inject(Router);
  authService = inject(AuthService);
  private destroy$ = new Subject<void>();

  orders: Order[] = [];
  loading = true;
  error = false;

  ngOnInit() {
    this.loadOrders();

    // Ricarica gli ordini quando si naviga alla pagina
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        filter((event: NavigationEnd) => event.url.includes('/user-area')),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.loadOrders();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadOrders() {
    this.loading = true;
    this.error = false;
    this.orderService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading orders:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  // Type guard per distinguere OrderItem da Product
  isOrderItem(item: Product | OrderItem): item is OrderItem {
    return (item as OrderItem).product !== undefined;
  }
}
