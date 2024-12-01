import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-new-product-form',
  templateUrl: './new-product-form.component.html',
  styleUrls: ['./new-product-form.component.scss'],
})
export class NewProductFormComponent {
  @Output() close = new EventEmitter<void>();

  product = {
    name: '',
    slug: '',
    category: 0,
    description: '',
    price: 0,
    available: false,
  };
  selectedImage: File | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private http: HttpClient) {}

  // Handle file selection
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
    }
  }

  onSubmit(): void {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    const url = `${environment.api_host}products/api/`;

    // Prepare FormData
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('slug', this.product.slug);
    formData.append('category', this.product.category.toString());
    formData.append('description', this.product.description);
    formData.append('price', this.product.price.toString());
    formData.append('available', this.product.available.toString());
    if (this.selectedImage) {
      formData.append('image', this.selectedImage, this.selectedImage.name);
    }

    // Make the API call
    this.http.post(url, formData, { headers }).subscribe({
      next: () => {
        this.successMessage = 'Product created successfully!';
        this.errorMessage = null;
        this.close.emit(); // Close the form after success
      },
      error: (error) => {
        this.errorMessage = 'Failed to create product. Please try again.';
        this.successMessage = null;
        console.error(error);
      },
    });
  }

  closeForm(): void {
    this.close.emit();
  }
}
