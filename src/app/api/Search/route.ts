import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) return NextResponse.json([]);

  const products = await client.fetch(
    `*[_type == "product" && (
      name match $query || 
      description match $query || 
      features[] match $query
    )] {
      _id,
      name,
      price,
      "slug": slug.current,
      "imageUrl": image.asset->url
    }`,
    
{ query: `${query}*` as unknown as never }
  );

  return NextResponse.json(products);
}






