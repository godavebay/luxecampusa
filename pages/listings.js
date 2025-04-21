
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [tiers, setTiers] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedTier, setSelectedTier] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [sortOrder, setSortOrder] = useState('tier');

  useEffect(() => {
    const fetchListings = async () => {
      const { data, error } = await supabase.from('listings').select('*');
      if (!error && data) {
        setListings(data);
        setFiltered(data);

        const uniqueTiers = [...new Set(data.map(item => item.tier))];
        const uniqueStates = [...new Set(data.map(item => item.location))];
        setTiers(uniqueTiers);
        setStates(uniqueStates);
      }
    };
    fetchListings();
  }, []);

  useEffect(() => {
    let result = [...listings];
    if (selectedTier) result = result.filter(l => l.tier === selectedTier);
    if (selectedState) result = result.filter(l => l.location === selectedState);
    if (sortOrder === 'tier') {
      const priority = { Premium: 1, Featured: 2, Standard: 3 };
      result.sort((a, b) => priority[a.tier] - priority[b.tier]);
    } else if (sortOrder === 'az') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'za') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }
    setFiltered(result);
  }, [selectedTier, selectedState, sortOrder, listings]);

  return (
    <div className="listings-page">
      <h1>Explore LuxeCamp Listings</h1>
      <div className="filters">
        <select value={selectedTier} onChange={e => setSelectedTier(e.target.value)}>
          <option value="">All Tiers</option>
          {tiers.map(tier => (
            <option key={tier} value={tier}>{tier}</option>
          ))}
        </select>
        <select value={selectedState} onChange={e => setSelectedState(e.target.value)}>
          <option value="">All Locations</option>
          {states.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
        <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
          <option value="tier">Tier Priority</option>
          <option value="az">A–Z</option>
          <option value="za">Z–A</option>
        </select>
      </div>
      <div className="grid">
        {filtered.map((listing) => (
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
