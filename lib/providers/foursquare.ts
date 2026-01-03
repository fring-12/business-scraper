import axios from "axios";
import type { Business } from "@/types/business";

interface FoursquarePlace {
  fsq_id: string;
  name: string;
  tel?: string;
  location: {
    address?: string;
    locality?: string;
    region?: string;
    postcode?: string;
    formatted_address?: string;
  };
  geocodes: {
    main: {
      latitude: number;
      longitude: number;
    };
  };
  rating?: number;
  stats?: {
    total_ratings?: number;
  };
  categories: Array<{
    id: number;
    name: string;
  }>;
  distance?: number;
}

interface FoursquareSearchParams {
  location?: string;
  category?: string;
  limit: number;
  radius: number;
}

export class FoursquareProvider {
  private apiKey: string;
  private searchUrl = "https://api.foursquare.com/v3/places/search";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async searchBusinesses(params: FoursquareSearchParams): Promise<Business[]> {
    try {
      if (!params.location || !params.category) {
        throw new Error("Location and category are required for Foursquare search");
      }

      const response = await axios.get(this.searchUrl, {
        headers: {
          Authorization: this.apiKey,
          Accept: "application/json",
        },
        params: {
          query: params.category,
          near: params.location,
          limit: params.limit,
          radius: params.radius,
          fields: "fsq_id,name,tel,location,geocodes,rating,stats,categories,distance",
        },
      });

      if (!response.data || !response.data.results) {
        throw new Error("No data received from Foursquare API");
      }

      // Filter businesses with phone numbers
      const businesses: Business[] = response.data.results
        .filter((place: FoursquarePlace) => place.tel)
        .map((place: FoursquarePlace) => this.transformToBusiness(place));

      return businesses;
    } catch (error: any) {
      console.error("Foursquare API error:", error);
      
      if (error.response?.status === 401) {
        throw new Error("Invalid Foursquare API key");
      }
      
      throw new Error(error.response?.data?.message || "Failed to fetch from Foursquare API");
    }
  }

  private transformToBusiness(place: FoursquarePlace): Business {
    return {
      id: place.fsq_id,
      name: place.name,
      phone: place.tel || "N/A",
      address: place.location.address || "N/A",
      city: place.location.locality || "N/A",
      state: place.location.region || "N/A",
      zipCode: place.location.postcode || "N/A",
      rating: place.rating ? place.rating / 2 : 0, // Foursquare uses 0-10 scale, convert to 0-5
      reviewCount: place.stats?.total_ratings || 0,
      categories: place.categories.map(cat => cat.name),
      url: `https://foursquare.com/v/${place.fsq_id}`,
      distance: place.distance ? Math.round(place.distance * 0.000621371 * 100) / 100 : undefined,
    };
  }
}







