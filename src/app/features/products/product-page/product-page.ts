import { Component, inject } from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import { Product } from '../../../core/models/product';
import { ProductApi } from '../../../core/services/product-api';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, combineLatest, map, debounceTime, distinctUntilChanged, startWith } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';

type Sort = 'priceAsc' | 'priceDesc' | 'dateAsc' | 'dateDesc';
const cmp = (s: Sort) => (a: Product, b: Product) =>
  s === 'priceAsc' ? a.price - b.price :
    s === 'priceDesc' ? b.price - a.price :
      s === 'dateAsc' ? a.createdAt.localeCompare(b.createdAt) :
        b.createdAt.localeCompare(a.createdAt);

@Component({
  selector: 'app-product-page',
  imports: [ProductCard, FormsModule, MatFormFieldModule, MatInput, MatLabel, MatSelectModule, AsyncPipe],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss',
})
export class ProductPage {
  private service = inject(ProductApi);
  protected readonly products$ = this.service.list();


  private filters$ = new BehaviorSubject({
    title: '',
    sort: 'dateDesc' as Sort,
    priceMin: '0',
    priceMax: '10000',
  })

  title$ = this.filters$.pipe(
    map(f => f.title),
    debounceTime(200),
    distinctUntilChanged(),
    startWith(this.filters$.value.title)
  );



  filteredProducts$ = combineLatest([
    this.products$,
    this.filters$,
    this.title$
  ]).pipe(
    map(([products, filters, title]) => products.filter(product => {
      const matchesTitle =
        !title || product.title.toLowerCase().includes(title.toLowerCase());
      const matchesPriceMin =
        !filters.priceMin || product.price >= Number(filters.priceMin);
      const matchesPriceMax =
        !filters.priceMax || product.price <= Number(filters.priceMax);
      return matchesTitle && matchesPriceMin && matchesPriceMax;
    })
      .toSorted(cmp(filters.sort))
    )
  );

  updateTitle(title: string) {
    console.log('Filtri applicati:');
    this.filters$.next({ ...this.filters$.value, title: title });
  }

  updateMin(min: string) {
    console.log('Filtri applicati:');
    this.filters$.next({ ...this.filters$.value, priceMin: min });
  }

  updateMax(max: string) {
    console.log('Filtri applicati:');
    this.filters$.next({ ...this.filters$.value, priceMax: max });
  }

  onAddToCart(product: Product) {
    console.log('Aggiunto al carrello:', product);
  }
  updateSort(sort: Sort) {
    this.filters$.next({ ...this.filters$.value, sort: sort });
  }


}

