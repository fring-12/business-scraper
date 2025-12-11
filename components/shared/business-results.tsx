"use client";

import { Phone, MapPin, Star, ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Business } from "@/types/business";
import { formatPhoneNumber } from "@/lib/utils";

interface BusinessResultsProps {
  businesses: Business[];
}

export const BusinessResults = ({ businesses }: BusinessResultsProps) => {
  if (businesses.length === 0) {
    return (
      <Card className="mt-8">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-lg text-muted-foreground">
            No businesses found. Try adjusting your search parameters.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Found {businesses.length} Business{businesses.length !== 1 ? "es" : ""}
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {businesses.map((business) => (
          <Card
            key={business.id}
            className="flex flex-col hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <CardTitle className="line-clamp-1">{business.name}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{business.rating}</span>
                </div>
                <span className="text-muted-foreground">
                  ({business.reviewCount} reviews)
                </span>
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-1 space-y-3">
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                <a
                  href={`tel:${business.phone}`}
                  className="text-sm font-medium hover:underline break-all"
                  aria-label={`Call ${business.name}`}
                >
                  {formatPhoneNumber(business.phone)}
                </a>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                <div className="text-sm">
                  <p>{business.address}</p>
                  <p>
                    {business.city}, {business.state} {business.zipCode}
                  </p>
                  {business.distance && (
                    <p className="text-muted-foreground mt-1">
                      {business.distance} miles away
                    </p>
                  )}
                </div>
              </div>

              {business.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {business.categories.slice(0, 3).map((category, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}

              <Button
                variant="outline"
                size="sm"
                className="w-full mt-4"
                asChild
              >
                <a
                  href={business.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${business.name} on Yelp`}
                >
                  <ExternalLink className="h-3 w-3 mr-2" />
                  View on Yelp
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

