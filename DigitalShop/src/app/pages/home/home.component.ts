import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/products.service';
import { ProductData } from '../../models/productData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: ProductData[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProductsList().subscribe({
      next: (data) => {
        console.log('API Response:', data); // Debug the response
        this.products = data;
      },
      error: (error) => console.error('API Error:', error),
    });
  }
}
