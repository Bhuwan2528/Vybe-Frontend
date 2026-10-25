export type ProductFit =
  | 'REGULAR'
  | 'RELAXED'
  | 'OVERSIZED'
  | 'LOOSE'
  | 'BOOTCUT'
  | 'WIDE_LEG';

export type StyleTag =
  | 'STREETWEAR'
  | 'MINIMAL'
  | 'AESTHETIC'
  | 'CLASSIC'
  | 'CASUAL';

  export type ProductSize =
  | 'S'
  | 'M'
  | 'L'
  | 'XL'
  | 'SIZE_26'
  | 'SIZE_28'
  | 'SIZE_30'
  | 'SIZE_32'
  | 'SIZE_34'
  | 'UK_6'
  | 'UK_7'
  | 'UK_8'
  | 'UK_9'
  | 'UK_10'
  | 'ONE_SIZE';


export type ProductColor =
  | 'BLACK'
  | 'WHITE'
  | 'GREY'
  | 'CHARCOAL'
  | 'BROWN'
  | 'BEIGE'
  | 'CREAM'
  | 'OLIVE'
  | 'GREEN'
  | 'BLUE'
  | 'NAVY'
  | 'RED'
  | 'MAROON'
  | 'PINK'
  | 'PURPLE'
  | 'YELLOW'
  | 'ORANGE'
  | 'MULTICOLOR';

export type Pattern =
  | 'SOLID'
  | 'PRINTED'
  | 'STRIPED'
  | 'EMBROIDERY'
  | 'GRAPHIC';

export interface ProductDto {
  id: string;
  name: string;
  description: string | null;
  price: string;
  originalPrice: string | null;
  imageUrl: string | null;
  colors: ProductColor[];
  fit: ProductFit | null;
  styleTags: StyleTag[];
  pattern: Pattern;
  tag: string | null;
  rating: string | null;
  reviews: number | null;
  brand: string | null;
  isFeatured: boolean;
  subCategoryId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationDto {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ProductListResponseDto {
  products: ProductDto[];
  pagination: PaginationDto;
  description: string;
}

export interface ProductQueryDto {
  page?: number;
  limit?: number;

  subCategory?: string[];
  colors?: ProductColor[];
  style?: StyleTag[];
  fit?: ProductFit[];
  pattern?: Pattern[];

  minPrice?: number;
  maxPrice?: number;

  description?: string;
  tag?: string;
  brand?: string;

  minRating?: number;
  isFeatured?: boolean;
}

export interface CategoryResponseDto {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SubCategoryResponseDto {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  imageUrl: string | null;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}