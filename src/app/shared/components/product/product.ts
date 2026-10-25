import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDto } from '../../../core/models/catalog.dto';

const DEFAULT_PRODUCT: ProductDto = {
  id: 'default-product',
  name: 'Midnight Oversized Graphic Tee',
  description: 'Premium heavyweight cotton · Relaxed fit',
  price: '899',
  originalPrice: '1299',
  imageUrl: 'https://placehold.co/800x1000/png',
  colors: ['BLACK'],
  fit: 'OVERSIZED',
  styleTags: ['STREETWEAR', 'CASUAL'],
  pattern: 'GRAPHIC',
  tag: 'Bestseller',
  rating: '4.5',
  reviews: 128,
  brand: 'VYBE',
  isFeatured: true,
  subCategoryId: '',
  isActive: true,
  createdAt: '',
  updatedAt: '',
};

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.html',
  styleUrl: './product.scss',
})
export class ProductComponent {
  readonly fallbackImage = 'https://placehold.co/800x1000/png';

  productData: ProductDto = { ...DEFAULT_PRODUCT };

  @Input()
  set product(value: Partial<ProductDto> | null | undefined) {
    if (!value) {
      this.productData = { ...DEFAULT_PRODUCT };
      return;
    }

    this.productData = {
      ...DEFAULT_PRODUCT,
      ...value,
      name: value.name ?? DEFAULT_PRODUCT.name,
      imageUrl: value.imageUrl || DEFAULT_PRODUCT.imageUrl,
    };
  }

  @Output() addToCart = new EventEmitter<ProductDto>();

  get discountPercent(): number {
    const price = Number(this.productData.price);
    const originalPrice = Number(this.productData.originalPrice);

    if (!this.productData.originalPrice || originalPrice <= price || price < 0) {
      return 0;
    }

    return Math.round(((originalPrice - price) / originalPrice) * 100);
  }

  onAddToCart(): void {
    this.addToCart.emit(this.productData);
  }
}