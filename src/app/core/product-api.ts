import { Injectable } from '@angular/core';
import { PRODUCTS_MOCK } from './mocks/product.mock';

@Injectable({
  providedIn: 'root',
})
export class ProductApi {
  list() {
    return PRODUCTS_MOCK;
  }
}