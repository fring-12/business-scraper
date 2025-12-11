"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { businessSearchSchema, type BusinessSearchInput } from "@/lib/validators";

interface BusinessSearchFormProps {
  onSearch: (data: BusinessSearchInput) => Promise<void>;
  isLoading: boolean;
}

const HOME_SERVICE_CATEGORIES = [
  { value: "plumber", label: "Plumber" },
  { value: "electrician", label: "Electrician" },
  { value: "hvac", label: "HVAC" },
  { value: "landscaping", label: "Landscaping" },
  { value: "roofing", label: "Roofing" },
  { value: "painter", label: "Painting" },
  { value: "carpenter", label: "Carpentry" },
  { value: "cleaning", label: "Cleaning Services" },
  { value: "pest control", label: "Pest Control" },
  { value: "garage door", label: "Garage Door Services" },
  { value: "locksmith", label: "Locksmith" },
  { value: "window cleaning", label: "Window Cleaning" },
  { value: "pool service", label: "Pool Services" },
  { value: "tree service", label: "Tree Services" },
  { value: "home security", label: "Home Security" },
];

export const BusinessSearchForm = ({ onSearch, isLoading }: BusinessSearchFormProps) => {
  const [customCategory, setCustomCategory] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BusinessSearchInput>({
    resolver: zodResolver(businessSearchSchema),
    defaultValues: {
      limit: 20,
      radius: 8000,
    },
  });

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCustomCategory("");
    setValue("category", value);
  };

  const handleCustomCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomCategory(value);
    setSelectedCategory("");
    setValue("category", value);
  };

  const handleFormSubmit = async (data: BusinessSearchInput) => {
    const categoryValue = customCategory || selectedCategory;
    if (!categoryValue) return;

    await onSearch({
      ...data,
      category: categoryValue,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="location">
            Location <span className="text-destructive">*</span>
          </Label>
          <Input
            id="location"
            placeholder="e.g., New York, NY or 10001"
            {...register("location")}
            disabled={isLoading}
            aria-label="Enter location"
            className="w-full"
          />
          {errors.location && (
            <p className="text-sm text-destructive" role="alert">
              {errors.location.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="category-select">
            Business Category <span className="text-destructive">*</span>
          </Label>
          <Select
            value={selectedCategory}
            onValueChange={handleCategoryChange}
            disabled={isLoading}
          >
            <SelectTrigger id="category-select" className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {HOME_SERVICE_CATEGORIES.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="custom-category">Or Enter Custom Category</Label>
        <Input
          id="custom-category"
          placeholder="e.g., air conditioning repair, lawn care"
          value={customCategory}
          onChange={handleCustomCategoryChange}
          disabled={isLoading}
          aria-label="Enter custom business category"
          className="w-full"
        />
        {errors.category && (
          <p className="text-sm text-destructive" role="alert">
            {errors.category.message}
          </p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="limit">Results Limit (1-50)</Label>
          <Input
            id="limit"
            type="number"
            min="1"
            max="50"
            defaultValue="20"
            {...register("limit", { valueAsNumber: true })}
            disabled={isLoading}
            aria-label="Number of results to fetch"
          />
          {errors.limit && (
            <p className="text-sm text-destructive" role="alert">
              {errors.limit.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="radius">Search Radius (meters)</Label>
          <Input
            id="radius"
            type="number"
            min="1"
            max="40000"
            defaultValue="8000"
            {...register("radius", { valueAsNumber: true })}
            disabled={isLoading}
            aria-label="Search radius in meters"
          />
          {errors.radius && (
            <p className="text-sm text-destructive" role="alert">
              {errors.radius.message}
            </p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full md:w-auto"
        size="lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Searching...
          </>
        ) : (
          <>
            <Search className="mr-2 h-4 w-4" />
            Search Businesses
          </>
        )}
      </Button>
    </form>
  );
};

