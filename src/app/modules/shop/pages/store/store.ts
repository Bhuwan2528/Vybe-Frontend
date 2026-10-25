import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ProductComponent } from '../../../../shared/components/product/product';
import { CatalogService } from '../../../../core/services/catalog.service';
import { AiService } from '../../../../core/services/ai.service';

import { HttpErrorResponse } from '@angular/common/http';

import {
  ProductDto,
  ProductColor,
  ProductFit,
  ProductSize,
  StyleTag,
  Pattern,
  ProductQueryDto,
  ProductListResponseDto,
  CategoryResponseDto,
  SubCategoryResponseDto,
} from '../../../../core/models/catalog.dto';

type FilterSection =
  | 'category'
  | 'subcategory'
  | 'price'
  | 'color'
  | 'size'
  | 'fit'
  | 'style'
  | 'pattern';

type SortOption = 'newest' | 'price-low' | 'price-high' | 'rating';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductComponent],
  templateUrl: './store.html',
  styleUrl: './store.scss',
})
export class StoreComponent implements OnInit {
  private readonly catalogService = inject(CatalogService);
  private readonly aiService = inject(AiService);

  // API data
  categories: CategoryResponseDto[] = [];
  subCategories: SubCategoryResponseDto[] = [];
  products: ProductDto[] = [];

  isLoading = false;
  isLoadingCategories = false;
  isLoadingSubCategories = false;
  isAiSearching = false;
  aiSearchQuery = '';
  aiSearchMessage = '';
  aiSearchMode = false;

  // Pagination response from backend
  pagination = {
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  };

  // Sidebar
  showSidebar = true;
  mobileFiltersOpen = false;

  // Category selection uses category IDs
  activeCategory = 'all';
  selectedSubcategories: string[] = [];

  get categoryOptions(): { value: string; label: string; count?: number }[] {
    return [
      { value: 'all', label: 'All Products', count: this.pagination.total },
      ...this.categories.map(category => ({
        value: category.id,
        label: category.name,
      })),
    ];
  }

  get visibleSubcategories(): SubCategoryResponseDto[] {
    if (this.activeCategory === 'all') {
      return this.subCategories;
    }

    return this.subCategories.filter(
      subcategory => subcategory.categoryId === this.activeCategory
    );
  }

  // Price
  minPrice = 0;
  maxPrice = 5000;

  // Selected filters
  selectedColors: ProductColor[] = [];
  selectedSizes: ProductSize[] = [];
  selectedFits: ProductFit[] = [];
  selectedStyles: StyleTag[] = [];
  selectedPatterns: Pattern[] = [];

  readonly colors: { name: ProductColor; label: string; hex: string }[] = [
    { name: 'BLACK', label: 'Black', hex: '#171817' },
    { name: 'WHITE', label: 'White', hex: '#FFFFFF' },
    { name: 'GREY', label: 'Grey', hex: '#A5A5A2' },
    { name: 'CHARCOAL', label: 'Charcoal', hex: '#474947' },
    { name: 'BROWN', label: 'Brown', hex: '#78563F' },
    { name: 'BEIGE', label: 'Beige', hex: '#C8B99D' },
    { name: 'CREAM', label: 'Cream', hex: '#D9D1BF' },
    { name: 'OLIVE', label: 'Olive', hex: '#667044' },
    { name: 'GREEN', label: 'Green', hex: '#477653' },
    { name: 'BLUE', label: 'Blue', hex: '#4678A5' },
    { name: 'NAVY', label: 'Navy', hex: '#263A56' },
    { name: 'RED', label: 'Red', hex: '#CB4242' },
    { name: 'MAROON', label: 'Maroon', hex: '#843D45' },
    { name: 'PINK', label: 'Pink', hex: '#E7B6BF' },
    { name: 'PURPLE', label: 'Purple', hex: '#8857A4' },
    { name: 'YELLOW', label: 'Yellow', hex: '#E9D34E' },
    { name: 'ORANGE', label: 'Orange', hex: '#E58A42' },
    {
      name: 'MULTICOLOR',
      label: 'Multicolor',
      hex: 'linear-gradient(135deg, #F55, #FC5, #5C9, #59F)',
    },
  ];

  readonly sizes: ProductSize[] = [
    'S', 'M', 'L', 'XL',
    'SIZE_26', 'SIZE_28', 'SIZE_30', 'SIZE_32', 'SIZE_34',
    'UK_6', 'UK_7', 'UK_8', 'UK_9', 'UK_10',
    'ONE_SIZE',
  ];

  readonly fits: ProductFit[] = [
    'REGULAR', 'RELAXED', 'OVERSIZED', 'LOOSE', 'BOOTCUT', 'WIDE_LEG',
  ];

  readonly styles: StyleTag[] = [
    'STREETWEAR', 'MINIMAL', 'AESTHETIC', 'CLASSIC', 'CASUAL',
  ];

  readonly patterns: Pattern[] = [
    'SOLID', 'PRINTED', 'STRIPED', 'EMBROIDERY', 'GRAPHIC',
  ];

  filterSections: Record<FilterSection, boolean> = {
    category: true,
    subcategory: true,
    price: true,
    color: true,
    size: true,
    fit: true,
    style: true,
    pattern: true,
  };

  sortBy: SortOption = 'newest';
  currentPage = 1;
  readonly pageSize = 12;

  ngOnInit(): void {
    this.loadCategories();
    this.loadSubCategories();
    this.loadProducts();
  }

  // ==================== CATEGORIES ====================

  private loadCategories(): void {
    this.isLoadingCategories = true;

    this.catalogService.getCategories().subscribe({
      next: response => {
        this.categories = response;
        this.isLoadingCategories = false;
      },
      error: error => {
        console.error('Failed to load categories:', error);
        this.isLoadingCategories = false;
      },
    });
  }

  // ==================== SUBCATEGORIES ====================

  private loadSubCategories(): void {
    this.isLoadingSubCategories = true;

    this.catalogService.getSubCategories().subscribe({
      next: response => {
        this.subCategories = response;
        this.isLoadingSubCategories = false;
      },
      error: error => {
        console.error('Failed to load subcategories:', error);
        this.isLoadingSubCategories = false;
      },
    });
  }

  // ==================== GET PRODUCTS ====================

  private buildProductQuery(): ProductQueryDto {
    const query: ProductQueryDto = {
      page: this.currentPage,
      limit: this.pageSize,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
    };

    if (this.selectedSubcategories.length) {
      query.subCategory = [...this.selectedSubcategories];
    } else if (this.activeCategory !== 'all') {
      query.subCategory = this.subCategories
        .filter(subcategory => subcategory.categoryId === this.activeCategory)
        .map(subcategory => subcategory.id);
    }

    if (this.selectedColors.length) {
      query.colors = [...this.selectedColors];
    }

    if (this.selectedFits.length) {
      query.fit = [...this.selectedFits];
    }

    if (this.selectedStyles.length) {
      query.style = [...this.selectedStyles];
    }

    if (this.selectedPatterns.length) {
      query.pattern = [...this.selectedPatterns];
    }

    return query;
  }

  private loadProducts(): void {
    this.aiSearchMode = false;
    this.isLoading = true;

    this.catalogService.getProducts(this.buildProductQuery()).subscribe({
      next: response => {
        this.setProductResponse(response);
        this.isLoading = false;
      },
      error: error => {
        console.error('Failed to load products:', error);
        this.products = [];
        this.pagination = {
          page: this.currentPage,
          limit: this.pageSize,
          total: 0,
          totalPages: 0,
        };
        this.isLoading = false;
      },
    });
  }

  private setProductResponse(response: ProductListResponseDto): void {
    this.products = response.products;
    this.pagination = response.pagination;
  }

  // ==================== AI SEARCH ====================

  submitAiSearch(query: string, event?: Event): void {
    event?.preventDefault();

    const search = query.trim();

    if (!search || this.isAiSearching) {
      return;
    }

    this.aiSearchQuery = search;
    this.aiSearchMode = true;
    this.isAiSearching = true;
    this.isLoading = true;
    this.aiSearchMessage = '';

    this.aiService.smartSearch(search).subscribe({
      next: response => {
        this.setProductResponse(response);
        this.aiSearchMessage = response.description || '';
        this.isAiSearching = false;
        this.isLoading = false;
        this.currentPage = response.pagination.page;
      },
      error: error => {
        console.error('AI search failed:', error);
        this.products = [];
        this.aiSearchMessage = 'Unable to search products. Please try again.';
        this.isAiSearching = false;
        this.isLoading = false;
      },
    });
  }

  clearAiSearch(): void {
    this.aiSearchQuery = '';
    this.aiSearchMessage = '';
    this.currentPage = 1;
    this.loadProducts();
  }

  // ==================== DISPLAY ====================

  get filteredProducts(): ProductDto[] {
    const result = [...this.products];

    switch (this.sortBy) {
      case 'price-low':
        result.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 'price-high':
        result.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case 'rating':
        result.sort((a, b) => Number(b.rating ?? 0) - Number(a.rating ?? 0));
        break;
      case 'newest':
        result.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    return result;
  }

  get visibleProducts(): ProductDto[] {
    return this.filteredProducts;
  }

  get totalPages(): number {
    return this.pagination.totalPages;
  }

  get totalProducts(): number {
    return this.pagination.total;
  }

  get startItem(): number {
    return this.totalProducts
      ? (this.pagination.page - 1) * this.pagination.limit + 1
      : 0;
  }

  get endItem(): number {
    return Math.min(
      this.pagination.page * this.pagination.limit,
      this.totalProducts
    );
  }

  get paginationPages(): Array<number | '…'> {
    const total = this.totalPages;

    if (total <= 7) {
      return Array.from({ length: total }, (_, index) => index + 1);
    }

    if (this.currentPage <= 3) {
      return [1, 2, 3, 4, 5, '…', total];
    }

    if (this.currentPage >= total - 2) {
      return [1, '…', total - 4, total - 3, total - 2, total - 1, total];
    }

    return [
      1,
      '…',
      this.currentPage - 1,
      this.currentPage,
      this.currentPage + 1,
      '…',
      total,
    ];
  }

  get activeFilterCount(): number {
    return (
      (this.activeCategory !== 'all' ? 1 : 0) +
      this.selectedSubcategories.length +
      this.selectedColors.length +
      this.selectedSizes.length +
      this.selectedFits.length +
      this.selectedStyles.length +
      this.selectedPatterns.length +
      (this.minPrice !== 0 || this.maxPrice !== 5000 ? 1 : 0)
    );
  }

  formatFilterLabel(value: string): string {
    return value
      .replaceAll('_', ' ')
      .toLowerCase()
      .replace(/\b\w/g, char => char.toUpperCase());
  }

  // ==================== FILTER ACTIONS ====================

  toggleDesktopSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }

  openMobileFilters(): void {
    this.mobileFiltersOpen = true;
  }

  closeMobileFilters(): void {
    this.mobileFiltersOpen = false;
  }

  applyMobileFilters(): void {
    this.currentPage = 1;
    this.loadProducts();
    this.closeMobileFilters();
  }

  toggleSection(section: FilterSection): void {
    this.filterSections[section] = !this.filterSections[section];
  }

  selectCategory(categoryId: string): void {
    this.activeCategory = categoryId;
    this.selectedSubcategories = [];
    this.currentPage = 1;
    this.loadProducts();
  }

  toggleSelection<T extends string>(list: T[], value: T): void {
    const index = list.indexOf(value);

    if (index >= 0) {
      list.splice(index, 1);
    } else {
      list.push(value);
    }

    this.currentPage = 1;
    this.loadProducts();
  }

  setPrice(type: 'min' | 'max', event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = Math.max(0, Math.min(5000, Number(input.value) || 0));

    if (type === 'min') {
      this.minPrice = Math.min(value, this.maxPrice);
    } else {
      this.maxPrice = Math.max(value, this.minPrice);
    }

    this.currentPage = 1;
    this.loadProducts();
  }

  onSortChange(event: Event): void {
    this.sortBy = (event.target as HTMLSelectElement).value as SortOption;
  }

  clearAllFilters(): void {
    this.activeCategory = 'all';
    this.selectedSubcategories = [];
    this.minPrice = 0;
    this.maxPrice = 5000;
    this.selectedColors = [];
    this.selectedSizes = [];
    this.selectedFits = [];
    this.selectedStyles = [];
    this.selectedPatterns = [];
    this.sortBy = 'newest';
    this.currentPage = 1;
    this.loadProducts();
  }

  // ==================== PAGINATION ====================

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }

    this.currentPage = page;

    if (this.aiSearchMode && this.aiSearchQuery) {
      // AI endpoint currently has no documented page parameter support.
      // Keep normal pagination on the products endpoint.
      this.loadProducts();
      return;
    }

    this.loadProducts();
  }

  handleAddToCart(product: ProductDto): void {
    console.log('Add to cart:', product);
  }
}