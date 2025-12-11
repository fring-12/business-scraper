import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { businessSearchSchema } from "@/lib/validators";
import type { Business } from "@/types/business";

const YELP_API_KEY = process.env.YELP_API_KEY;
const YELP_API_URL = "https://api.yelp.com/v3/businesses/search";

export async function POST(request: NextRequest) {
  try {
    if (!YELP_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured. Please add YELP_API_KEY to .env.local" },
        { status: 500 }
      );
    }

    const body = await request.json();
    
    const validatedData = businessSearchSchema.parse({
      location: body.location,
      category: body.category,
      limit: body.limit || 20,
      radius: body.radius || 8000,
    });

    const response = await axios.get(YELP_API_URL, {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
      params: {
        location: validatedData.location,
        term: validatedData.category,
        limit: validatedData.limit,
        radius: validatedData.radius,
        sort_by: "best_match",
      },
    });

    if (!response.data || !response.data.businesses) {
      return NextResponse.json(
        { error: "No data received from API" },
        { status: 500 }
      );
    }

    const businesses: Business[] = response.data.businesses
      .filter((business: any) => business.phone)
      .map((business: any) => ({
        id: business.id,
        name: business.name,
        phone: business.phone || business.display_phone || "N/A",
        address: business.location?.address1 || "N/A",
        city: business.location?.city || "N/A",
        state: business.location?.state || "N/A",
        zipCode: business.location?.zip_code || "N/A",
        rating: business.rating || 0,
        reviewCount: business.review_count || 0,
        categories: business.categories?.map((cat: any) => cat.title) || [],
        url: business.url || "#",
        distance: business.distance
          ? Math.round(business.distance * 0.000621371 * 100) / 100
          : undefined,
      }));

    return NextResponse.json({
      businesses,
      total: businesses.length,
    });
  } catch (error: any) {
    console.error("Scraping error:", error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid input parameters", details: error.errors },
        { status: 400 }
      );
    }

    if (error.response?.status === 400) {
      return NextResponse.json(
        { error: "Invalid search parameters. Please check your location and category." },
        { status: 400 }
      );
    }

    if (error.response?.status === 401) {
      return NextResponse.json(
        { error: "Invalid API key. Please check your Yelp API credentials." },
        { status: 401 }
      );
    }

    if (error.response?.status === 429) {
      return NextResponse.json(
        { error: "API rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch business data. Please try again." },
      { status: 500 }
    );
  }
}

