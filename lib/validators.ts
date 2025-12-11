import { z } from "zod";

export const businessSearchSchema = z.object({
  location: z.string().optional(),
  category: z.string().optional(),
  limit: z.number().min(1).max(50).default(20),
  radius: z.number().min(1).max(40000).default(8000),
  provider: z.enum(["google", "foursquare", "yelp"]).default("google"),
  cities: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  state: z.string().optional(),
});

export type BusinessSearchInput = z.infer<typeof businessSearchSchema>;

