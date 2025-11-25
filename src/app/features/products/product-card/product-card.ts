import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../core/models/product';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe],
  standalone: true,
  template: `
    <article class="card">
      <h3>{{ product.title }}</h3>
      <p>{{ product.price | currency: 'EUR': 'symbol': '1.2-2' }}</p>
      <button (click)="addToCart(product)">Aggiungi</button>
    </article>
  `,
  styles: ``,
})

export class ProductCard {
    @Input({ required: true }) product!: Product;
    @Output () add = new EventEmitter<Product>();
    addToCart (p: Product) {this.add.emit (p); 
  } 

}
