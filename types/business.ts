export interface Business {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  rating: number;
  reviewCount: number;
  categories: string[];
  url: string;
  distance?: number;
}

export interface SearchParams {
  location: string;
  category: string;
  limit?: number;
  radius?: number;
}

export interface ApiResponse {
  businesses: Business[];
  total: number;
  error?: string;
}

