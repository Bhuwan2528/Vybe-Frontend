import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ProductListResponseDto } from '../models/catalog.dto';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.baseUrl;

  smartSearch(query: string): Observable<ProductListResponseDto> {

    return this.http.post<ProductListResponseDto>(
      `${this.baseUrl}/ai/search`,
      { query }
    );
  }
}