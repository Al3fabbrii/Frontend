import { Component, inject } from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import { Product } from '../../../core/models/product';
import { ProductApi } from '../../../core/product-api';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';


@Component({
  selector: 'app-product-page',
  imports: [ProductCard, FormsModule, MatFormFieldModule, MatInput, MatLabel],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss',
})
export class ProductPage {
  private service = inject(ProductApi);
  products = this.service.list();

  filteredProducts = this.products;

  filters = {
    title: ''
  };

  applyFilters() {
    console.log('Filtri applicati:', this.filters);
    const title = this.filters.title.toLowerCase();
    this.filteredProducts = this.products.filter(product => {
      const matchesTitle = !title || product.title.toLowerCase().includes(title);
      return matchesTitle;
    });
  }

  onAddToCart(product: Product) {
    console.log('Aggiunto al carrello:', product);
  }
}

