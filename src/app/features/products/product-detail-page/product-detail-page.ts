import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { switchMap, map } from 'rxjs';
import { ProductApi } from '../../../core/services/product-api';
import { CartService } from '../../../core/services/cart';
import { Product } from '../../../core/models/product';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { WishlistService } from '../../../core/services/wishlist';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  templateUrl: './product-detail-page.html',
  styleUrls: ['./product-detail-page.scss'],
  imports: [RouterModule, AsyncPipe, CurrencyPipe, MatCardModule, MatButtonModule],
})

export class ProductDetailPage {
  private route = inject(ActivatedRoute);
  private svc = inject(ProductApi);
  private cartService = inject(CartService);
  private wishlistService = inject(WishlistService);

  readonly product$ = this.route.paramMap.pipe(
    map(params => params.get('id') as string),
    switchMap(id => this.svc.getById(id)),
  );

  addToCart(product: Product) {
    this.cartService.addItem(product.id, 1).subscribe({
      next: () => {
        console.log(`✓ ${product.title} aggiunto al carrello`);
        alert(`${product.title} aggiunto al carrello!`);
      },
      error: (err) => {
        console.error('Error adding to cart:', err);
        alert('Errore durante l\'aggiunta al carrello. Assicurati di essere loggato.');
      }
    });
  }
  addToWishlist(product: Product) {
    this.wishlistService.addItem(product.id.toString()).subscribe({
      next: () => {
        console.log(`✓ ${product.title} aggiunto ai preferiti`);
        alert(`${product.title} aggiunto ai preferiti!`);
      },
      error: (err) => {
        console.error('Error adding to wishlist:', err);
        alert('Errore durante l\'aggiunta ai preferiti. Assicurati di essere loggato.');
      }
    });
  }
}