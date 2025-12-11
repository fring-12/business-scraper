import axios from "axios";
import type { Business } from "@/types/business";

interface GooglePlaceResult {
  place_id: string;
  name: string;
  formatted_phone_number?: string;
  international_phone_number?: string;
  formatted_address?: string;
  address_components?: Array<{
    long_name: string;
    short_name: string;
    types: string[];
  }>;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  rating?: number;
  user_ratings_total?: number;
  types?: string[];
  url?: string;
}

interface GooglePlacesSearchParams {
  location: string;
  category: string;
  limit: number;
  radius: number;
}

export class GooglePlacesProvider {
  private apiKey: string;
  private textSearchUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json";
  private detailsUrl = "https://maps.googleapis.com/maps/api/place/details/json";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async searchBusinesses(params: GooglePlacesSearchParams): Promise<Business[]> {
    try {
      // Step 1: Text search to find businesses
      const searchResponse = await axios.get(this.textSearchUrl, {
        params: {
          query: `${params.category} in ${params.location}`,
          key: this.apiKey,
        },
      });

      if (searchResponse.data.status !== "OK" && searchResponse.data.status !== "ZERO_RESULTS") {
        throw new Error(`Google Places API error: ${searchResponse.data.status}`);
      }

      const places = searchResponse.data.results.slice(0, params.limit);

      // Step 2: Get detailed information for each place (including phone numbers)
      const businesses: Business[] = [];

      for (const place of places) {
        try {
          const detailsResponse = await axios.get(this.detailsUrl, {
            params: {
              place_id: place.place_id,
              fields: "name,formatted_phone_number,international_phone_number,formatted_address,address_components,geometry,rating,user_ratings_total,types,url",
              key: this.apiKey,
            },
          });

          if (detailsResponse.data.status === "OK") {
            const details: GooglePlaceResult = detailsResponse.data.result;
            
            // Only include businesses with phone numbers
            if (details.formatted_phone_number || details.international_phone_number) {
              const business = this.transformToBusiness(details, params.location);
              businesses.push(business);
            }
          }
        } catch (error) {
          console.error(`Error fetching details for place ${place.place_id}:`, error);
          // Continue with next place
        }
      }

      return businesses;
    } catch (error: any) {
      console.error("Google Places API error:", error);
      throw new Error(error.response?.data?.error_message || "Failed to fetch from Google Places API");
    }
  }

  private transformToBusiness(place: GooglePlaceResult, searchLocation: string): Business {
    const addressComponents = this.parseAddressComponents(place.address_components || []);
    
    return {
      id: place.place_id,
      name: place.name,
      phone: place.formatted_phone_number || place.international_phone_number || "N/A",
      address: addressComponents.street || place.formatted_address?.split(",")[0] || "N/A",
      city: addressComponents.city || "N/A",
      state: addressComponents.state || "N/A",
      zipCode: addressComponents.zipCode || "N/A",
      rating: place.rating || 0,
      reviewCount: place.user_ratings_total || 0,
      categories: place.types?.filter(type => !type.includes("_")).map(type => 
        type.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
      ) || [],
      url: place.url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name)}`,
      distance: undefined, // Google doesn't provide distance in this API
    };
  }

  private parseAddressComponents(components: Array<{
    long_name: string;
    short_name: string;
    types: string[];
  }>) {
    const result = {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    };

    for (const component of components) {
      if (component.types.includes("street_number")) {
        result.street = component.long_name + " ";
      } else if (component.types.includes("route")) {
        result.street += component.long_name;
      } else if (component.types.includes("locality")) {
        result.city = component.long_name;
      } else if (component.types.includes("administrative_area_level_1")) {
        result.state = component.short_name;
      } else if (component.types.includes("postal_code")) {
        result.zipCode = component.long_name;
      }
    }

    return result;
  }
}





