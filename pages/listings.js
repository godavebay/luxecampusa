
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Listings() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .order('tier', { ascending: false });

      if (!error) setListings(data);
    };

    fetchListings();
  }, []);

  return (
    <div className="listings-page">
      <h1>Explore LuxeCamp Listings</h1>
      <div className="grid">
        {listings.map((listing) => (
          <Link key={listing.id} href={`/listing/${listing.slug}`} className="card-link">
            <div className="card">
              <img src={listing.image_urls?.[0] || '/fallback.jpg'} alt={listing.name} />
              <div className="card-content">
                <h2>{listing.name}</h2>
                <p>{listing.location}</p>
                <span className={`badge ${listing.tier?.toLowerCase()}`}>{listing.tier}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
