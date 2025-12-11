"use client";

import { useState } from "react";
import axios from "axios";
import { AlertCircle, Building2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BusinessSearchForm } from "@/components/shared/business-search-form";
import { BusinessResults } from "@/components/shared/business-results";
import { ExportButton } from "@/components/shared/export-button";
import type { Business } from "@/types/business";
import type { BusinessSearchInput } from "@/lib/validators";

export default function HomePage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (data: BusinessSearchInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/scrape", data);

      if (response.data.error) {
        setError(response.data.error);
        setBusinesses([]);
        return;
      }

      setBusinesses(response.data.businesses || []);

      if (response.data.businesses.length === 0) {
        setError("No businesses found. Try adjusting your search parameters.");
      }
    } catch (err: any) {
      console.error("Search error:", err);
      
      const errorMessage =
        err.response?.data?.error ||
        "Failed to search businesses. Please check your API configuration and try again.";
      
      setError(errorMessage);
      setBusinesses([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-6xl space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Building2 className="h-12 w-12 text-primary" />
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Business Scraper
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Generate leads for your AI voice assistant by finding legitimate home
              service businesses in the US with verified phone numbers and contact
              details.
            </p>
          </div>

          {/* Search Form */}
          <Card>
            <CardHeader>
              <CardTitle>Search Home Service Businesses</CardTitle>
              <CardDescription>
                Enter a location and select or type a business category to find
                businesses with phone numbers and contact information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BusinessSearchForm onSearch={handleSearch} isLoading={isLoading} />
            </CardContent>
          </Card>

          {/* Error Message */}
          {error && (
            <Card className="border-destructive/50 bg-destructive/10">
              <CardContent className="flex items-start gap-3 pt-6">
                <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-medium text-destructive">Error</p>
                  <p className="text-sm text-destructive/90">{error}</p>
                  {error.includes("API key") && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Make sure you have added your Yelp API key to the{" "}
                      <code className="bg-muted px-1 py-0.5 rounded">
                        .env.local
                      </code>{" "}
                      file. See the README for instructions.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Export Button */}
          {businesses.length > 0 && (
            <div className="flex justify-end">
              <ExportButton businesses={businesses} disabled={isLoading} />
            </div>
          )}

          {/* Results */}
          {(businesses.length > 0 || (!isLoading && businesses.length === 0 && !error)) && (
            <BusinessResults businesses={businesses} />
          )}

          {/* Info Footer */}
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    How to Use:
                  </h3>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Enter a location (city, state, or ZIP code)</li>
                    <li>Select a business category or enter a custom one</li>
                    <li>Adjust search parameters if needed</li>
                    <li>Click "Search Businesses" to get results</li>
                    <li>Export results to CSV for your cold calling campaign</li>
                  </ol>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Data Source:
                  </h3>
                  <p>
                    This app uses the Yelp Fusion API (free tier: 5,000 calls/day)
                    to fetch legitimate business information. All data is sourced
                    from publicly available business listings.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

