import { Component, Input } from '@angular/core';
import { ProductData } from '../../models/productData';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product-card-display',
  templateUrl: './product-card-display.component.html',
  styleUrls: ['./product-card-display.component.scss'],
})
export class ProductCardDisplayComponent {
  @Input() product!: ProductData; // Accept product data as an input property

  // Method to generate the full URL for the product image
  getImageUrl(): string {
    return `${environment.api_host}${this.product.image}`;
  }
}
