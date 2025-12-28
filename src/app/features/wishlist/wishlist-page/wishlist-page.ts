import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart';
import { Product } from '../../../core/models/product';
import { inject } from '@angular/core';
import { MatAnchor, MatIconButton } from "@angular/material/button";
import { WishlistService } from '../../../core/services/wishlist';
import { CurrencyPipe } from "@angular/common";
import { MatCardContent, MatCard, MatCardActions } from "@angular/material/card";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-wishlist-page',
  imports: [MatAnchor, MatCardContent, MatCard, MatCardActions, CurrencyPipe, CommonModule, MatIconModule, MatIconButton, RouterLink],
  templateUrl: './wishlist-page.html',
  styleUrl: './wishlist-page.scss',
})
export class WishlistPage implements OnInit {
  wishlistService = inject(WishlistService);
  private cartService = inject(CartService);

  ngOnInit() {
    // Carica la wishlist all'inizializzazione
    this.wishlistService.loadWishlist().subscribe();
  }

  onAddToCart(product: Product) {
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

  removeItem(itemId: number) {
    this.wishlistService.removeItem(itemId.toString()).subscribe({
      next: () => {
        console.log('✓ Prodotto rimosso dalla wishlist');
      },
      error: (err) => {
        console.error('Error removing from wishlist:', err);
        alert('Errore durante la rimozione dalla wishlist.');
      }
    });
  }


}
