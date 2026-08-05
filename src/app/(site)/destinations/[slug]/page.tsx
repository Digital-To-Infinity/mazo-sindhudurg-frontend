import React from 'react';
import { notFound } from 'next/navigation';
import { getContentList } from '@/services/content';
import DestinationDetail, { DestinationData } from '@/components/destination/DestinationDetail';
import { Metadata } from 'next';
import { api } from '@/services/api';

interface PageProps {
  params: Promise<{ slug: string }>
}

const DESTINATION_FALLBACKS: Record<string, DestinationData> = {
  malvan: {
    slug: 'malvan',
    name: 'Malvan',
    tagline: 'Historic Sindhudurg fort, scuba diving, and authentic Malvani seafood.',
    type: 'Beach Town & Water Sports',
    heroImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
    description: `
      <p>Malvan is a picturesque coastal town in the Sindhudurg district of Maharashtra. Renowned for its historical 17th-century Sindhudurg Sea Fort built by Chhatrapati Shivaji Maharaj, Malvan is also India's premier scuba diving and water sports hub.</p>
      <p>The region is celebrated worldwide for its distinct Malvani cuisine—spicy seafood curries prepared with fresh coconut, Sol Kadhi, and Kokum. Visitors flock to Chivla Beach, Rock Garden, and Malvan jetty for unforgettable coastal sunset views.</p>
    `,
    bestTimeToVisit: 'October to May',
    nearestAirport: 'Chhipi Airport, Sindhudurg (22 km)',
    nearestRailway: 'Kudal Railway Station (30 km)',
    attractions: [
      { title: 'Sindhudurg Fort', type: 'Historic Fort', image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f', desc: 'Imposing sea fort built on Kurte island surrounded by Arabian sea.' },
      { title: 'Chivla Beach', type: 'Beach', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', desc: 'Serene crescent bay with clear waters perfect for swimming.' },
      { title: 'Rock Garden', type: 'Garden & Sunset View', image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206', desc: 'Scenic rocky coastline overlooking crashing waves and sunsets.' },
      { title: 'Scuba Diving Jetty', type: 'Water Sports', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5', desc: 'Discover vibrant marine life and coral beds under expert guidance.' }
    ],
    localFood: ['Malvani Surmai Curry', 'Sol Kadhi', 'Kombdi Vade', 'Fried Bombil'],
    staysCount: '45+ Stays'
  },
  tarkarli: {
    slug: 'tarkarli',
    name: 'Tarkarli',
    tagline: 'Pristine white sand beaches where Karli river meets the Arabian Sea.',
    type: 'Beach & Backwaters',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    description: `
      <p>Tarkarli is a tranquil coastal village famous for its long stretch of white sand beach and crystal-clear waters. It is one of the few places along the Konkan coast where you can experience backwater boat rides alongside beach activities.</p>
      <p>At Devbagh Sangam, the Karli river gracefully merges into the Arabian sea, creating a serene ecosystem suitable for dolphin cruises, kayaking, and luxurious houseboat stays.</p>
    `,
    bestTimeToVisit: 'October to April',
    nearestAirport: 'Chhipi Airport, Sindhudurg (25 km)',
    nearestRailway: 'Kudal Railway Station (33 km)',
    attractions: [
      { title: 'Tarkarli Beach', type: 'White Sand Beach', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', desc: 'Silky white sand and turquoise waters for long relaxing walks.' },
      { title: 'Devbagh Sangam', type: 'River & Sea Confluence', image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206', desc: 'Where Karli river flows into the sea, offering dolphin watching.' },
      { title: 'Karli Backwaters', type: 'Backwater Boating', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', desc: 'Scenic mangrove estuaries navigable by motorboats and houseboats.' }
    ],
    localFood: ['Crab Masala', 'Prawns Sukka', 'Modak', 'Sol Kadhi'],
    staysCount: '30+ Stays'
  },
  vengurla: {
    slug: 'vengurla',
    name: 'Vengurla',
    tagline: 'Lush cashew groves, tranquil shores, and colonial lighthouse views.',
    type: 'Secluded Beaches & Culture',
    heroImage: 'https://images.unsplash.com/photo-1519046904884-53103b34b206',
    description: `
      <p>Vengurla is a historic port town surrounded by a semicircle of green hills rich in cashew, mango, and coconut plantations. Known for its quiet, untamed beaches like Mochemad and Shiroda, Vengurla offers a peaceful coastal getaway away from crowds.</p>
      <p>The Vengurla Lighthouse offers panoramic views of the rocky sea islands (Vengurla Rocks) and the vast blue horizon.</p>
    `,
    bestTimeToVisit: 'October to March',
    nearestAirport: 'MOPA Airport, Goa (45 km)',
    nearestRailway: 'Sawantwadi Road Station (18 km)',
    attractions: [
      { title: 'Vengurla Lighthouse', type: 'Colonial Landmark', image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206', desc: 'Panoramic hilltop lighthouse watching over Vengurla port.' },
      { title: 'Mochemad Beach', type: 'Golden Sand Beach', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', desc: 'Secluded beach flanked by green hills and gentle surf.' },
      { title: 'Shiroda Beach', type: 'Beach & Salt Pans', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5', desc: 'Historical seaside village famous for salt pans and clean waters.' }
    ],
    localFood: ['Cashew Nut Curry', 'Fish Thali', 'Kaju Katli', 'Sol Kadhi'],
    staysCount: '20+ Stays'
  },
  amboli: {
    slug: 'amboli',
    name: 'Amboli',
    tagline: 'South Maharashtra’s rainiest hill station with cascading waterfalls.',
    type: 'Hill Station & Nature',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    description: `
      <p>Perched at an altitude of 690 meters in the Western Ghats, Amboli is the last hill station of Maharashtra before the coastal plains of Goa. Celebrated for receiving the highest rainfall in the state, it turns into a misty green paradise during monsoon.</p>
      <p>It is a hotspot for biodiversity, natural waterfalls, flora, and panoramic valley viewpoints like Sunset Point and Kavlesad Point.</p>
    `,
    bestTimeToVisit: 'June to September (Monsoon) / October to February',
    nearestAirport: 'MOPA Airport, Goa (55 km)',
    nearestRailway: 'Sawantwadi Road Station (30 km)',
    attractions: [
      { title: 'Amboli Falls', type: 'Waterfall', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', desc: 'Spectacular cascading waterfall spilling over monsoon cliffs.' },
      { title: 'Kavlesad Point', type: 'Valley View', image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206', desc: 'Deep valley gorge offering reverse waterfall views during winds.' },
      { title: 'Hiranyakeshi Temple', type: 'Origin & Cave', image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f', desc: 'Sacred cave temple at the source of Hiranyakeshi river.' }
    ],
    localFood: ['Pithla Bhakri', 'Hot Tea & Bhajiyas', 'Ghavan', 'Sol Kadhi'],
    staysCount: '15+ Stays'
  },
  devgad: {
    slug: 'devgad',
    name: 'Devgad',
    tagline: 'World-famous Alphonso mangoes, coastal windmills, and sea forts.',
    type: 'Forts & Mango Country',
    heroImage: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f',
    description: `
      <p>Devgad is globally renowned as the heartland of authentic Hapus (Alphonso) mangoes. Situated along a natural harbor, it features the magnificent Devgad Sea Fort, historic temples, and modern coastal windmill farms.</p>
      <p>Visitors can explore Kunkeshwar Temple—often called the Kashi of Konkan—located right on the ocean shore.</p>
    `,
    bestTimeToVisit: 'October to May',
    nearestAirport: 'Chhipi Airport, Sindhudurg (50 km)',
    nearestRailway: 'Kankavli Railway Station (45 km)',
    attractions: [
      { title: 'Kunkeshwar Temple', type: 'Shore Temple', image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f', desc: 'Ancient Shiva temple constructed right on the sandy ocean beach.' },
      { title: 'Devgad Fort', type: 'Coastal Fort', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5', desc: 'Harbor fort offering 360-degree views of the Arabian Sea.' },
      { title: 'Windmill Garden', type: 'Scenic Spot', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', desc: 'Windmills towering above the coastal cliffs.' }
    ],
    localFood: ['Devgad Alphonso Mangoes', 'Amba Poli', 'Fish Thali', 'Sol Kadhi'],
    staysCount: '25+ Stays'
  }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const lowercaseSlug = slug.toLowerCase();

  const fallback = DESTINATION_FALLBACKS[lowercaseSlug];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mazosindhudurg.com';
  const title = fallback ? `${fallback.name} Travel Guide` : `${slug} Destination`;
  const description = fallback ? fallback.tagline : `Explore ${slug} in Sindhudurg, Maharashtra.`;
  const canonical = `${siteUrl}/destinations/${slug}`;
  const ogImage = fallback?.heroImage || `${siteUrl}/og-default.jpg`;

  return {
    title: `${title} | Mazo Sindhudurg`,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title} | Mazo Sindhudurg`,
      description,
      url: canonical,
      siteName: 'Mazo Sindhudurg',
      images: [{ url: ogImage }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    }
  };
}

export default async function DestinationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const lowercaseSlug = slug.toLowerCase();

  // 1. Check if backend has dynamic content article/page matching slug
  let dbItem: any = null;
  try {
    const items = await getContentList({ slug, type: 'all' });
    dbItem = items?.[0];
  } catch (e) {
    // API fail silent, use fallback
  }

  // 2. Use fallback if available, or construct from DB item
  let data: DestinationData | null = DESTINATION_FALLBACKS[lowercaseSlug] || null;

  if (dbItem) {
    data = {
      slug: dbItem.slug,
      name: dbItem.title,
      tagline: dbItem.excerpt || (data?.tagline || `Explore ${dbItem.title}`),
      type: dbItem.content_type || (data?.type || 'Destination'),
      heroImage: dbItem.media?.secure_url || (data?.heroImage || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5'),
      description: dbItem.content_html || (data?.description || `<p>${dbItem.excerpt || ''}</p>`),
      bestTimeToVisit: data?.bestTimeToVisit || 'October to May',
      nearestAirport: data?.nearestAirport || 'Chhipi Airport, Sindhudurg',
      nearestRailway: data?.nearestRailway || 'Kudal Railway Station',
      attractions: data?.attractions || [],
      localFood: data?.localFood || ['Malvani Fish Curry', 'Sol Kadhi'],
      staysCount: data?.staysCount || '20+ Stays'
    };
  }

  if (!data) {
    notFound();
  }

  return <DestinationDetail data={data} />;
}
