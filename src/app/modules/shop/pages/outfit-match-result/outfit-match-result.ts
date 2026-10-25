
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductComponent } from '../../../../shared/components/product/product';
import type { ProductDto } from '../../../../core/models/catalog.dto';

@Component({
  selector: 'app-outfit-match-result',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductComponent],
  templateUrl: './outfit-match-result.html',
  styleUrl: './outfit-match-result.scss',
})
export class OutfitMatchResultComponent {
  isSaved = false;

  readonly budgetLimit = 5000;

  readonly collectionTitle = 'The Urban Minimalist';

  readonly collectionDescription =
    'A clean, versatile streetwear combination built around relaxed silhouettes, neutral tones and everyday comfort.';

  // Demo data. Later this can come from the AI result.
  readonly products: ProductDto[] = [
    {
      id: 'outfit-101',
      name: 'Midnight Oversized Graphic Tee',
      description: 'Heavyweight cotton · Relaxed silhouette',
      price: '899',
      originalPrice: '1299',
      imageUrl:
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85',
      colors: ['BLACK'],
      fit: 'OVERSIZED',
      styleTags: ['STREETWEAR', 'CASUAL'],
      pattern: 'GRAPHIC',
      tag: 'AI PICK',
      rating: '4.5',
      reviews: 128,
      brand: 'VYBE',
      isFeatured: true,
      subCategoryId: 'cmvleghuj0003t770jvw5ndw4',
      isActive: true,
      createdAt: '2026-10-25T17:54:07.484Z',
      updatedAt: '2026-10-25T17:54:07.484Z',
    },
    {
      id: 'outfit-102',
      name: 'Relaxed Everyday Shirt',
      description: 'Soft texture · Minimal everyday layering',
      price: '1099',
      originalPrice: '1499',
      imageUrl:
        'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=85',
      colors: ['BEIGE'],
      fit: 'RELAXED',
      styleTags: ['MINIMAL', 'CASUAL'],
      pattern: 'SOLID',
      tag: 'LAYERING PICK',
      rating: '4.6',
      reviews: 84,
      brand: 'VYBE',
      isFeatured: true,
      subCategoryId: 'cmvleghuj0003t770jvw5ndw4',
      isActive: true,
      createdAt: '2026-10-24T17:54:07.484Z',
      updatedAt: '2026-10-24T17:54:07.484Z',
    },
    {
      id: 'outfit-103',
      name: 'Utility Street Cargo',
      description: 'Relaxed utility fit · Effortless streetwear',
      price: '1399',
      originalPrice: '1799',
      imageUrl:
        'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=85',
      colors: ['OLIVE', 'BLACK'],
      fit: 'WIDE_LEG',
      styleTags: ['STREETWEAR', 'MINIMAL'],
      pattern: 'SOLID',
      tag: 'PERFECT MATCH',
      rating: '4.7',
      reviews: 86,
      brand: 'VYBE',
      isFeatured: true,
      subCategoryId: 'cmvleghuj0003t770jvw5ndw4',
      isActive: true,
      createdAt: '2026-10-23T17:54:07.484Z',
      updatedAt: '2026-10-23T17:54:07.484Z',
    },
    {
      id: 'outfit-104',
      name: 'Everyday Street Sneakers',
      description: 'Clean profile · Easy everyday styling',
      price: '699',
      originalPrice: null,
      imageUrl:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=85',
      colors: ['BLACK', 'WHITE'],
      fit: 'REGULAR',
      styleTags: ['CASUAL', 'CLASSIC'],
      pattern: 'SOLID',
      tag: null,
      rating: '4.6',
      reviews: 64,
      brand: 'VYBE',
      isFeatured: true,
      subCategoryId: 'cmvleghuj0003t770jvw5ndw4',
      isActive: true,
      createdAt: '2026-10-22T17:54:07.484Z',
      updatedAt: '2026-10-22T17:54:07.484Z',
    },
  ];

  readonly reasons = [
    {
      icon: 'fa-solid fa-layer-group',
      title: 'Balanced silhouettes',
      description:
        'The relaxed top works with wider bottoms to create an effortless, proportionate look.',
    },
    {
      icon: 'fa-solid fa-palette',
      title: 'A cohesive palette',
      description:
        'Black, olive and neutral tones work together without making the outfit feel overdone.',
    },
    {
      icon: 'fa-solid fa-wand-magic-sparkles',
      title: 'One versatile look',
      description:
        'Each piece can be worn separately, giving you more combinations from the same collection.',
    },
  ];

  get totalPrice(): number {
    return this.products.reduce(
      (total, product) => total + Number(product.price),
      0,
    );
  }

  get originalTotal(): number {
    return this.products.reduce(
      (total, product) =>
        total + Number(product.originalPrice ?? product.price),
      0,
    );
  }

  get totalSavings(): number {
    return Math.max(0, this.originalTotal - this.totalPrice);
  }

  get budgetRemaining(): number {
    return Math.max(0, this.budgetLimit - this.totalPrice);
  }

  get budgetProgress(): number {
    return Math.min(100, (this.totalPrice / this.budgetLimit) * 100);
  }

  toggleSaveCollection(): void {
    this.isSaved = !this.isSaved;
  }

  handleAddToCart(product: ProductDto): void {
    console.log('Add to cart:', product);
  }
}
