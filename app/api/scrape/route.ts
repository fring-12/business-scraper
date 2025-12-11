import { NextRequest, NextResponse } from "next/server";
import { businessSearchSchema } from "@/lib/validators";
import { GooglePlacesProvider } from "@/lib/providers/google-places";
import { FoursquareProvider } from "@/lib/providers/foursquare";
import { YelpProvider } from "@/lib/providers/yelp";
import type { Business } from "@/types/business";

// API Keys
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const FOURSQUARE_API_KEY = process.env.FOURSQUARE_API_KEY;
const YELP_API_KEY = process.env.YELP_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validatedData = businessSearchSchema.parse({
      location: body.location,
      category: body.category,
      limit: body.limit || 20,
      radius: body.radius || 8000,
      provider: body.provider || "google",
    });

    let businesses: Business[] = [];

    // Select provider based on user choice
    switch (validatedData.provider) {
      case "google":
        if (!GOOGLE_PLACES_API_KEY) {
          return NextResponse.json(
            { error: "Google Places API key not configured. Please add GOOGLE_PLACES_API_KEY to .env.local or try a different provider." },
            { status: 500 }
          );
        }
        const googleProvider = new GooglePlacesProvider(GOOGLE_PLACES_API_KEY);
        businesses = await googleProvider.searchBusinesses(validatedData);
        break;

      case "foursquare":
        if (!FOURSQUARE_API_KEY) {
          return NextResponse.json(
            { error: "Foursquare API key not configured. Please add FOURSQUARE_API_KEY to .env.local or try a different provider." },
            { status: 500 }
          );
        }
        const foursquareProvider = new FoursquareProvider(FOURSQUARE_API_KEY);
        businesses = await foursquareProvider.searchBusinesses(validatedData);
        break;

      case "yelp":
        if (!YELP_API_KEY) {
          return NextResponse.json(
            { error: "Yelp API key not configured. Please add YELP_API_KEY to .env.local or try a different provider." },
            { status: 500 }
          );
        }
        const yelpProvider = new YelpProvider(YELP_API_KEY);
        businesses = await yelpProvider.searchBusinesses(validatedData);
        break;

      default:
        return NextResponse.json(
          { error: "Invalid provider selected." },
          { status: 400 }
        );
    }

    return NextResponse.json({
      businesses,
      total: businesses.length,
      provider: validatedData.provider,
    });
  } catch (error: any) {
    console.error("Scraping error:", error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid input parameters", details: error.errors },
        { status: 400 }
      );
    }

    // Provider-specific error handling
    if (error.message) {
      return NextResponse.json(
        { error: error.message },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch business data. Please try again or switch to a different provider." },
      { status: 500 }
    );
  }
}

