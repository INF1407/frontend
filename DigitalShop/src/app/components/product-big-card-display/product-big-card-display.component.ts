import { Component, Input } from '@angular/core';
import { ProductData } from '../../models/productData';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product-big-card-display',
  templateUrl: './product-big-card-display.component.html',
  styleUrls: ['./product-big-card-display.component.scss'],
})
export class ProductBigCardDisplayComponent {
  @Input() product!: ProductData;

  getImageUrl(): string {
    return `${environment.api_host}${this.product.image}`;
  }
}
