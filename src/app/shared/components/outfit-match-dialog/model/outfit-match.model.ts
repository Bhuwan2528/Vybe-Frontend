export enum OutfitOccasion {
  COLLEGE = 'college',
  DATE = 'date',
  PARTY = 'party',
  DAILY_WEAR = 'daily-wear',
  TRAVEL = 'travel',
  FORMAL = 'formal',
}

export enum OutfitStyle {
  STREETWEAR = 'streetwear',
  MINIMAL_CLASSY = 'minimal-classy',
  CASUAL = 'casual',
  TRENDY = 'trendy',
  SMART_CASUAL = 'smart-casual',
  AESTHETIC = 'aesthetic',
}


export interface GenerateOutfitDto {
  occasion: string;
  style: string;
  budget?: number;
  message?: string;
}

export interface OutfitMatchSeedProduct {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  category?: string;
  color?: string;
}

export interface OutfitMatchItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  category: string;
  color?: string;
  sizes?: string[];
  isBaseProduct?: boolean;
  inStock?: boolean;
}

export interface OutfitMatchApiResponse {
  collectionId?: string;
  title?: string;
  description?: string;
  styleSummary?: string;
  items: OutfitMatchItem[];
}

export interface OutfitMatchDialogData {
  product: OutfitMatchSeedProduct;
}

export interface OutfitMatchDialogResult {
  response: OutfitMatchApiResponse;
  product: OutfitMatchSeedProduct;
  preferences: GenerateOutfitDto;
}

export interface SaveOutfitCollectionRequest {
  title: string;
  originalProductId: string;
  productIds: string[];
  preferences: GenerateOutfitDto;
  collectionId?: string;
}