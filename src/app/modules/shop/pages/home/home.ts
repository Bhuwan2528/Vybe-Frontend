import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { ProductComponent } from '../../../../shared/components/product/product';
import { AiStylistDialogService } from '../../../../shared/components/ai-stylist-dialog/ai-stylist-dialog.service';

import { CatalogService } from '../../../../core/services/catalog.service';
import { AiService } from '../../../../core/services/ai.service';

import { ProductDto, ProductListResponseDto } from '../../../../core/models/catalog.dto';
import { SubCategoryResponseDto } from '../../../../core/models/catalog.dto';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ProductComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, AfterViewInit, OnDestroy {

  private readonly catalogService = inject(CatalogService);
  private readonly aiService = inject(AiService);
  private readonly aiStylistService = inject(AiStylistDialogService);

  // ==================== SUBCATEGORIES ====================

  subCategories: SubCategoryResponseDto[] = [];
  isLoadingSubCategories = false;

  // ==================== FEATURED PRODUCTS ====================

  featuredProducts: ProductDto[] = [];
  isLoadingFeaturedProducts = false;

  // ==================== AI SMART SEARCH ====================

  aiSearchResults: ProductDto[] = [];
  aiSearchMessage = '';
  isAiSearching = signal(false);

  // ==================== CATEGORY AUTO-SCROLL ====================

  @ViewChild('categoryTrack')
  categoryTrack?: ElementRef<HTMLDivElement>;

  private categoryTimer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.loadSubCategories();
    this.loadFeaturedProducts();
  }

  ngAfterViewInit(): void {
    this.startCategoryAutoScroll();
  }

  ngOnDestroy(): void {
    this.stopCategoryAutoScroll();
  }

  // ==================== LOAD SUBCATEGORIES ====================

  private loadSubCategories(): void {
    this.isLoadingSubCategories = true;

    this.catalogService.getSubCategories().subscribe({
      next: (response) => {
        this.subCategories = response;
        this.isLoadingSubCategories = false;
      },
      error: (error) => {
        console.error('Failed to load subcategories:', error);
        this.isLoadingSubCategories = false;
      },
    });
  }

  // ==================== LOAD FEATURED PRODUCTS ====================

private loadFeaturedProducts(): void {
  console.time('Featured products total');

  this.catalogService.getProducts({
    page: 1,
    limit: 8,
    isFeatured: true,
  }).subscribe({
    next: (response) => {
      console.timeEnd('Featured products total');
      console.log('Response received:', performance.now());

      this.featuredProducts = response.products;
      this.isLoadingFeaturedProducts = false;
    },
    error: (error) => {
      console.error(error);
      this.isLoadingFeaturedProducts = false;
    },
  });
}

  // ==================== AI SMART SEARCH ====================
submitAiSearch(query: string, event: Event): void {
  event.preventDefault();

  const search = query.trim();

  if (!search || this.isAiSearching()) return;

  this.isAiSearching.set(true);

  this.aiService.smartSearch(search).subscribe({
    next: (response) => {
      this.aiSearchResults = response.products;
      this.aiSearchMessage = response.description || '';
      this.isAiSearching.set(false);
    },
    error: (error) => {
      console.error('AI search failed:', error);
      this.isAiSearching.set(false);
    },
  });
}

  // ==================== AI STYLIST DIALOG ====================

  openAiDialog(): void {
    this.aiStylistService.open();
  }

  // ==================== CATEGORY AUTO-SCROLL CONTROLS ====================

  pauseCategoryAutoScroll(): void {
    this.stopCategoryAutoScroll();
  }

  resumeCategoryAutoScroll(): void {
    this.startCategoryAutoScroll();
  }

  private stopCategoryAutoScroll(): void {
    if (this.categoryTimer !== undefined) {
      clearInterval(this.categoryTimer);
      this.categoryTimer = undefined;
    }
  }

  private startCategoryAutoScroll(): void {
    this.stopCategoryAutoScroll();

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    this.categoryTimer = setInterval(() => {
      const track = this.categoryTrack?.nativeElement;

      const firstCard =
        track?.querySelector<HTMLElement>('.shop-category-card');

      if (!track || !firstCard) {
        return;
      }

      const gap = parseFloat(getComputedStyle(track).gap) || 12;
      const step = firstCard.getBoundingClientRect().width + gap;
      const maxScroll = track.scrollWidth - track.clientWidth;

      if (maxScroll <= 1) {
        return;
      }

      if (track.scrollLeft + step >= maxScroll - 2) {
        track.scrollTo({
          left: 0,
          behavior: 'smooth',
        });
      } else {
        track.scrollBy({
          left: step,
          behavior: 'smooth',
        });
      }
    }, 3000);
  }
}