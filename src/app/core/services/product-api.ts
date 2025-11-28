import { Injectable } from '@angular/core';
import { PRODUCTS_MOCK } from '../mocks/product.mock';
import { delay, Observable, of } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductApi {
  list(): Observable<Product[]> {
    return of(PRODUCTS_MOCK).pipe(delay(300));
  }
}