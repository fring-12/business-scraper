"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadCSV } from "@/lib/utils";
import type { Business } from "@/types/business";

interface ExportButtonProps {
  businesses: Business[];
  disabled?: boolean;
}

export const ExportButton = ({ businesses, disabled }: ExportButtonProps) => {
  const handleExport = () => {
    if (businesses.length === 0) return;

    const exportData = businesses.map((business) => ({
      Name: business.name,
      Phone: business.phone,
      Address: business.address,
      City: business.city,
      State: business.state,
      "Zip Code": business.zipCode,
      Rating: business.rating,
      "Review Count": business.reviewCount,
      Categories: business.categories.join("; "),
      "Yelp URL": business.url,
      "Distance (miles)": business.distance || "N/A",
    }));

    const timestamp = new Date().toISOString().split("T")[0];
    downloadCSV(exportData, `businesses_${timestamp}.csv`);
  };

  return (
    <Button
      onClick={handleExport}
      disabled={disabled || businesses.length === 0}
      variant="secondary"
      size="lg"
      className="w-full md:w-auto"
    >
      <Download className="mr-2 h-4 w-4" />
      Export to CSV ({businesses.length})
    </Button>
  );
};

