import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductData } from '../models/productData';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root', // Makes this service available throughout the app
})
export class ProductService {
  private productsListUrl = environment.productsListAPI; // Fetch URL from environment

  constructor(private http: HttpClient) {}

  /**
   * Fetches the list of products from the backend API.
   * @returns {Observable<Product[]>} An observable containing the list of products.
   */
  getProductsList(): Observable<ProductData[]> {
    return this.http.get<ProductData[]>(this.productsListUrl);
  }
}
