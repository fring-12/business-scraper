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
import {
  businessSearchSchema,
  type BusinessSearchInput,
} from "@/lib/validators";
import { US_STATES, getCitiesForState } from "@/lib/us-locations";

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

const API_PROVIDERS = [
  {
    value: "google",
    label: "Google Places (Recommended)",
    description: "Most comprehensive data",
  },
  { value: "foursquare", label: "Foursquare", description: "Good alternative" },
  { value: "yelp", label: "Yelp Fusion", description: "Legacy option" },
];

export const BusinessSearchForm = ({
  onSearch,
  isLoading,
}: BusinessSearchFormProps) => {
  const [customCategory, setCustomCategory] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string>("google");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [availableCities, setAvailableCities] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BusinessSearchInput>({
    resolver: zodResolver(businessSearchSchema),
    defaultValues: {
      limit: 50,
      radius: 8000,
      provider: "google",
    },
  });

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
    setCustomCategory("");
  };

  const handleSelectAllCategories = () => {
    if (selectedCategories.length === HOME_SERVICE_CATEGORIES.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(HOME_SERVICE_CATEGORIES.map((cat) => cat.value));
    }
  };

  const handleCustomCategoryChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setCustomCategory(value);
    setSelectedCategories([]);
  };

  const handleProviderChange = (value: string) => {
    setSelectedProvider(value);
    setValue("provider", value as "google" | "foursquare" | "yelp");
  };

  const handleStateChange = (value: string) => {
    setSelectedState(value);
    setSelectedCities([]);
    const cities = getCitiesForState(value);
    setAvailableCities(cities);
  };

  const handleCityToggle = (city: string) => {
    setSelectedCities((prev) => {
      if (prev.includes(city)) {
        return prev.filter((c) => c !== city);
      } else {
        return [...prev, city];
      }
    });
  };

  const handleSelectAllCities = () => {
    if (selectedCities.length === availableCities.length) {
      setSelectedCities([]);
    } else {
      setSelectedCities([...availableCities]);
    }
  };

  const handleFormSubmit = async (data: BusinessSearchInput) => {
    // Use custom category if provided, otherwise use selected categories
    const categoriesToSearch = customCategory
      ? [customCategory]
      : selectedCategories;

    if (categoriesToSearch.length === 0 || selectedCities.length === 0) return;

    const stateLabel =
      US_STATES.find((s) => s.value === selectedState)?.value || selectedState;

    // Pass cities and categories arrays to onSearch
    await onSearch({
      ...data,
      location: "", // Will be set per city
      category: "", // Will be set per category
      cities: selectedCities,
      categories: categoriesToSearch,
      state: stateLabel,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Provider Selection */}
      <div className="space-y-2">
        <Label htmlFor="provider-select">
          Data Source <span className="text-destructive">*</span>
        </Label>
        <Select
          value={selectedProvider}
          onValueChange={handleProviderChange}
          disabled={isLoading}
        >
          <SelectTrigger id="provider-select" className="w-full">
            <SelectValue placeholder="Select data source" />
          </SelectTrigger>
          <SelectContent>
            {API_PROVIDERS.map((provider) => (
              <SelectItem key={provider.value} value={provider.value}>
                {provider.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          {selectedProvider === "google" &&
            "Requires Google Places API key (includes phone numbers and comprehensive data)"}
          {selectedProvider === "foursquare" &&
            "Requires Foursquare API key (free tier available)"}
          {selectedProvider === "yelp" &&
            "Requires Yelp Fusion API key (5,000 calls/day free)"}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="state-select">
            State <span className="text-destructive">*</span>
          </Label>
          <Select
            value={selectedState}
            onValueChange={handleStateChange}
            disabled={isLoading}
          >
            <SelectTrigger id="state-select" className="w-full">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {US_STATES.map((state) => (
                <SelectItem key={state.value} value={state.value}>
                  {state.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {!selectedState && errors.location && (
            <p className="text-sm text-destructive" role="alert">
              State is required
            </p>
          )}
        </div>

        <div className="space-y-2 md:col-span-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="city-select">
              Cities <span className="text-destructive">*</span>
              <span className="text-xs text-muted-foreground ml-2">
                ({selectedCities.length} selected)
              </span>
            </Label>
            {selectedState && availableCities.length > 0 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleSelectAllCities}
                disabled={isLoading}
                className="h-7 text-xs"
              >
                {selectedCities.length === availableCities.length
                  ? "Deselect All"
                  : "Select All"}
              </Button>
            )}
          </div>
          {!selectedState ? (
            <p className="text-sm text-muted-foreground py-4">
              Please select a state first
            </p>
          ) : (
            <div className="border rounded-md p-4 max-h-64 overflow-y-auto bg-background">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {availableCities.map((city) => (
                  <label
                    key={city}
                    className="flex items-center space-x-2 cursor-pointer hover:bg-muted/50 p-2 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCities.includes(city)}
                      onChange={() => handleCityToggle(city)}
                      disabled={isLoading}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm">{city}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
          {selectedState && selectedCities.length === 0 && errors.location && (
            <p className="text-sm text-destructive" role="alert">
              At least one city is required
            </p>
          )}
        </div>

        <div className="space-y-2 md:col-span-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="category-select">
              Business Categories <span className="text-destructive">*</span>
              <span className="text-xs text-muted-foreground ml-2">
                ({selectedCategories.length} selected)
              </span>
            </Label>
            {HOME_SERVICE_CATEGORIES.length > 0 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleSelectAllCategories}
                disabled={isLoading}
                className="h-7 text-xs"
              >
                {selectedCategories.length === HOME_SERVICE_CATEGORIES.length
                  ? "Deselect All"
                  : "Select All"}
              </Button>
            )}
          </div>
          <div className="border rounded-md p-4 max-h-64 overflow-y-auto bg-background">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {HOME_SERVICE_CATEGORIES.map((category) => (
                <label
                  key={category.value}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-muted/50 p-2 rounded"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.value)}
                    onChange={() => handleCategoryToggle(category.value)}
                    disabled={isLoading || !!customCategory}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm">{category.label}</span>
                </label>
              ))}
            </div>
          </div>
          {selectedCategories.length === 0 &&
            !customCategory &&
            errors.category && (
              <p className="text-sm text-destructive" role="alert">
                At least one category is required
              </p>
            )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="custom-category">
          Or Enter Custom Category (overrides checkboxes)
        </Label>
        <Input
          id="custom-category"
          placeholder="e.g., air conditioning repair, lawn care"
          value={customCategory}
          onChange={handleCustomCategoryChange}
          disabled={isLoading}
          aria-label="Enter custom business category"
          className="w-full"
        />
        {customCategory && (
          <p className="text-xs text-muted-foreground">
            Custom category will be used instead of selected categories above
          </p>
        )}
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
            defaultValue="50"
            {...register("limit", { valueAsNumber: true })}
            disabled={isLoading}
            aria-label="Number of results to fetch"
          />
          <p className="text-xs text-muted-foreground">
            Max 50 results per search. Set to 50 for maximum leads.
          </p>
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
          <p className="text-xs text-muted-foreground">
            8000m ≈ 5 miles | 16000m ≈ 10 miles | 40000m ≈ 25 miles
          </p>
          {errors.radius && (
            <p className="text-sm text-destructive" role="alert">
              {errors.radius.message}
            </p>
          )}
        </div>
      </div>

      {/* Info box for multi-city and multi-category search */}
      <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">
          🎯 Multi-City & Multi-Category Search
        </h4>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>
            • <strong>Select multiple cities AND categories</strong> to search
            all combinations
          </li>
          <li>
            • API calls = Cities × Categories (e.g., 20 cities × 3 categories =
            60 searches)
          </li>
          <li>
            • All results <strong>automatically combined</strong> into one CSV
            file
          </li>
          <li>
            • Example: 20 cities × 3 categories × 50 results ={" "}
            <strong>3,000 leads</strong> in one export!
          </li>
          <li>• Progress bar shows current city + category being searched</li>
          <li>• Use "Select All" buttons to quickly select everything</li>
        </ul>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full md:w-auto bg-slate-100 text-primary-foreground hover:bg-slate-200 border-slate-300"
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
