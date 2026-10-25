import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { CategoryResponseDto, ProductDto, ProductListResponseDto, ProductQueryDto, SubCategoryResponseDto } from '../models/catalog.dto';


@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.baseUrl;

  // ==================== CATEGORIES ====================

  getCategories(): Observable<CategoryResponseDto[]> {
    return this.http.get<CategoryResponseDto[]>(
      `${this.baseUrl}/categories`
    );
  }

  // ==================== SUBCATEGORIES ====================

  getSubCategories(): Observable<SubCategoryResponseDto[]> {
    return this.http.get<SubCategoryResponseDto[]>(
      `${this.baseUrl}/subcategories`
    );
  }

  // ==================== PRODUCTS ====================

  // Get products with filters, sorting-ready query structure
  // and pagination support.

  getProducts(
    query: ProductQueryDto = {}
  ): Observable<ProductListResponseDto> {

    let params = new HttpParams();

    if (query.page !== undefined) {
      params = params.set('page', query.page);
    }

    if (query.limit !== undefined) {
      params = params.set('limit', query.limit);
    }

    if (query.minPrice !== undefined) {
      params = params.set('minPrice', query.minPrice);
    }

    if (query.maxPrice !== undefined) {
      params = params.set('maxPrice', query.maxPrice);
    }

    if (query.description) {
      params = params.set('description', query.description);
    }

    // Array query parameters
    if (query.subCategory?.length) {
      query.subCategory.forEach(value => {
        params = params.append('subCategory', value);
      });
    }

    if (query.colors?.length) {
      query.colors.forEach(value => {
        params = params.append('colors', value);
      });
    }

    if (query.style?.length) {
      query.style.forEach(value => {
        params = params.append('style', value);
      });
    }

    if (query.fit?.length) {
      query.fit.forEach(value => {
        params = params.append('fit', value);
      });
    }

    if (query.pattern?.length) {
      query.pattern.forEach(value => {
        params = params.append('pattern', value);
      });
    }

    if (query.tag) {
      params = params.set('tag', query.tag);
    }

    if (query.brand) {
      params = params.set('brand', query.brand);
    }

    if (query.minRating !== undefined) {
      params = params.set('minRating', query.minRating);
    }

    if (query.isFeatured !== undefined) {
      params = params.set('isFeatured', query.isFeatured);
    }

    return this.http.get<ProductListResponseDto>(
      `${this.baseUrl}/products`,
      { params }
    );
  }

  // ==================== PRODUCT BY ID ====================

  getProductById(id: string): Observable<ProductDto> {
    return this.http.get<ProductDto>(
      `${this.baseUrl}/products/${encodeURIComponent(id)}`
    );
  }
}