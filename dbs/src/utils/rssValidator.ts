import { z } from 'zod';

/**
 * Defines the Zod schema for a single feed entry.
 * This ensures each feed object has the correct structure and data types.
 */
export const FeedSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  url: z.string().url(),
  name: z.string(),
  category: z.string().optional(),
  enabled: z.boolean().default(true),
  maxItems: z.number().min(1).max(10).default(5),
});

/**
 * Defines the Zod schema for the entire feed configuration file.
 * It expects an object with a 'feeds' property containing an array of FeedSchema objects.
 */
export const FeedConfigSchema = z.object({ 
  feeds: z.array(FeedSchema) 
});
