import axios from "axios";
import type { Business } from "@/types/business";

interface YelpBusiness {
  id: string;
  name: string;
  phone?: string;
  display_phone?: string;
  location: {
    address1?: string;
    city?: string;
    state?: string;
    zip_code?: string;
  };
  rating?: number;
  review_count?: number;
  categories?: Array<{
    title: string;
  }>;
  url?: string;
  distance?: number;
}

interface YelpSearchParams {
  location: string;
  category: string;
  limit: number;
  radius: number;
}

export class YelpProvider {
  private apiKey: string;
  private searchUrl = "https://api.yelp.com/v3/businesses/search";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async searchBusinesses(params: YelpSearchParams): Promise<Business[]> {
    try {
      const response = await axios.get(this.searchUrl, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
        params: {
          location: params.location,
          term: params.category,
          limit: params.limit,
          radius: params.radius,
          sort_by: "best_match",
        },
      });

      if (!response.data || !response.data.businesses) {
        throw new Error("No data received from Yelp API");
      }

      const businesses: Business[] = response.data.businesses
        .filter((business: YelpBusiness) => business.phone)
        .map((business: YelpBusiness) => this.transformToBusiness(business));

      return businesses;
    } catch (error: any) {
      console.error("Yelp API error:", error);
      
      if (error.response?.status === 401) {
        throw new Error("Invalid Yelp API key");
      }
      
      throw new Error(error.response?.data?.error?.description || "Failed to fetch from Yelp API");
    }
  }

  private transformToBusiness(business: YelpBusiness): Business {
    return {
      id: business.id,
      name: business.name,
      phone: business.phone || business.display_phone || "N/A",
      address: business.location?.address1 || "N/A",
      city: business.location?.city || "N/A",
      state: business.location?.state || "N/A",
      zipCode: business.location?.zip_code || "N/A",
      rating: business.rating || 0,
      reviewCount: business.review_count || 0,
      categories: business.categories?.map(cat => cat.title) || [],
      url: business.url || "#",
      distance: business.distance
        ? Math.round(business.distance * 0.000621371 * 100) / 100
        : undefined,
    };
  }
}





