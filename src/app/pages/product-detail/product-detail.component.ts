import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ProductData } from '../../models/productData';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: ProductData | null = null;
  errorMessage: string | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    const slug = this.route.snapshot.paramMap.get('slug');
    if (productId && slug) {
      this.loadProduct(productId, slug);
    } else {
      this.errorMessage = 'Invalid product details.';
    }
  }

  loadProduct(id: string, slug: string): void {
    const url = `${environment.api_host}products/api/`;
    const params = { id, slug };

    this.http.get<ProductData>(url, { params }).subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load product details.';
        console.error(error);
      },
    });
  }
}
