
import Link from 'next/link';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { createClient } from '@supabase/supabase-js';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [tiers, setTiers] = useState([]);
  const [states, setStates] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [selectedTier, setSelectedTier] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('tier');

  useEffect(() => {
    const fetchListings = async () => {
      const { data, error } = await supabase.from('listings').select('*');
      if (!error && data) {
        setListings(data);
        setFiltered(data);

        const uniqueTiers = [...new Set(data.map(item => item.tier))];
        const uniqueStates = [...new Set(data.map(item => item.location))];
        const allAmenities = [...new Set(data.flatMap(item =>
          Array.isArray(item.amenities) ? item.amenities : (item.amenities || "").split(',').map(a => a.trim())
        ))];
        setTiers(uniqueTiers);
        setStates(uniqueStates);
        setAmenities(allAmenities);
      }
    };
    fetchListings();
  }, []);

  useEffect(() => {
    let result = [...listings];
    if (selectedTier) result = result.filter(l => l.tier === selectedTier);
    if (selectedState) result = result.filter(l => l.location === selectedState);
    if (selectedAmenities.length > 0) {
      result = result.filter(l =>
        selectedAmenities.every(amenity =>
          (Array.isArray(l.amenities) ? l.amenities : (l.amenities || "").split(',').map(a => a.trim())).includes(amenity)
        )
      );
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(l => l.name.toLowerCase().includes(term) || l.location.toLowerCase().includes(term));
    }
    if (sortOrder === 'tier') {
      const priority = { Premium: 1, Featured: 2, Standard: 3 };
      result.sort((a, b) => priority[a.tier] - priority[b.tier]);
    } else if (sortOrder === 'az') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'za') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }
    setFiltered(result);
  }, [selectedTier, selectedState, selectedAmenities, sortOrder, searchTerm, listings]);

  const toggleAmenity = (amenity) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  return (
    <div className="listings-page">
      <h1>Explore LuxeCamp Listings</h1>
      <div className="filters">
        <input type="text" placeholder="Search by name or location" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
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
      <div className="amenities">
        {amenities.map(amenity => (
          <label key={amenity}>
            <input
              type="checkbox"
              checked={selectedAmenities.includes(amenity)}
              onChange={() => toggleAmenity(amenity)}
            />
            {amenity}
          </label>
        ))}
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
      <div className="map-container">
        <MapContainer center={[39.5, -98.35]} zoom={4} scrollWheelZoom={false} style={{ height: "400px", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {filtered.map((listing, idx) =>
            listing.latitude && listing.longitude ? (
              <Marker key={idx} position={[listing.latitude, listing.longitude]}>
                <Popup>
                  <strong>{listing.name}</strong><br />
                  {listing.location}
                </Popup>
              </Marker>
            ) : null
          )}
        </MapContainer>
      </div>
    </div>
  );
}
