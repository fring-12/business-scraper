import { z } from "zod";

export const businessSearchSchema = z.object({
  location: z.string().min(2, "Location must be at least 2 characters"),
  category: z.string().min(2, "Category must be at least 2 characters"),
  limit: z.number().min(1).max(50).default(20),
  radius: z.number().min(1).max(40000).default(8000),
});

export type BusinessSearchInput = z.infer<typeof businessSearchSchema>;

