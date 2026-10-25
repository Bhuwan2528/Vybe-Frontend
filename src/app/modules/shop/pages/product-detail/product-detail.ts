
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OutfitMatchDialogService } from '../../../../shared/components/outfit-match-dialog/services/outfit-match.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail {

  outfitMatch = inject(OutfitMatchDialogService)

  product = {
    brand: 'VYBE',
    name: 'Essential Oversized Tee',
    price: 799,
    originalPrice: 1199,
    discount: '33% OFF',
    rating: 4.8,
    reviews: 124,
    badge: 'Bestseller',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVaQ8mrG5jp5wkjIHqTtGfS_gUK0A5T-WatYUlt0a_sw&s=10',
    description:
      'A minimal oversized tee designed for everyday comfort. Premium cotton fabric with a relaxed fit, perfect for layering or wearing solo.',
  };

  sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  selectedSize = 'L';
  quantity = 1;

  isWishlisted = false;
  showSizeGuide = false;
  outfitGenerated = false;
  cartMessage = '';

  outfitItems = [
    {
      name: 'Oversized Tee',
      image: '/images/categories/t-shirts.webp',
    },
    {
      name: 'Relaxed Shirt',
      image: '/images/categories/shirts.webp',
    },
    {
      name: 'Cargo Pants',
      image: '/images/categories/cargos.webp',
    },
    {
      name: 'Street Jacket',
      image: '/images/categories/jackets.webp',
    },
  ];

  selectSize(size: string): void {
    this.selectedSize = size;
    this.cartMessage = '';
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity(): void {
    if (this.quantity < 10) {
      this.quantity++;
    }
  }

  toggleWishlist(): void {
    this.isWishlisted = !this.isWishlisted;
  }

  addToCart(): void {
    this.cartMessage =
      `${this.product.name} · Size ${this.selectedSize} · Qty ${this.quantity} — demo action`;
  }

  buyNow(): void {
    this.cartMessage =
      'Buy Now preview is ready. Checkout will be connected later.';
  }

  generateOutfit(): void {
    // Frontend demo only: no AI API call yet.
    this.outfitMatch.open()
    this.outfitGenerated = true;
  }

  closeSizeGuide(): void {
    this.showSizeGuide = false;
  }


  
}
