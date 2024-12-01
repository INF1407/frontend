import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardDisplayComponent } from './product-card-display.component';

describe('ProductCardDisplayComponent', () => {
  let component: ProductCardDisplayComponent;
  let fixture: ComponentFixture<ProductCardDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCardDisplayComponent]
    });
    fixture = TestBed.createComponent(ProductCardDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
