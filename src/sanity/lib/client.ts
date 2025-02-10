// lib/client.ts
import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-05-03', // Use the latest API version
  useCdn: true, // Disable CDN for real-time data
  token: process.env.SANITY_API_TOKEN, // API token for write access
});