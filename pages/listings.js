
import Head from 'next/head';
import { useState } from 'react';

export default function Listings() {
  const listings = [
    {
      name: "Whispering Pines RV Resort",
      location: "Jackson Hole, WY",
      tier: "Premium",
      state: "WY",
      region: "West",
      image: "/rv-resort.jpg",
      amenities: ["Pool", "Golf", "Spa"]
    },
    {
      name: "Golden Sky Glamping Retreat",
      location: "Asheville, NC",
      tier: "Featured",
      state: "NC",
      region: "South",
      image: "/glamping-retreat.jpg",
      amenities: ["Hot Tub", "Fire Pit", "WiFi"]
    },
    {
      name: "Treehouse Haven",
      location: "Big Sur, CA",
      tier: "Standard",
      state: "CA",
      region: "West",
      image: "/treehouse.jpg",
      amenities: ["Mountain View", "BBQ", "Luxury Bedding"]
    }
  ];

  const uniqueStates = [...new Set(listings.map(l => l.state))];
  const uniqueRegions = [...new Set(listings.map(l => l.region))];
  const uniqueAmenities = [...new Set(listings.flatMap(l => l.amenities))];

  const [filters, setFilters] = useState({
    state: '',
    region: '',
    amenity: '',
    tier: 'All'
  });

  const applyFilters = (listings) => {
    return listings.filter(item => {
      const matchesState = filters.state === '' || item.state === filters.state;
      const matchesRegion = filters.region === '' || item.region === filters.region;
      const matchesAmenity = filters.amenity === '' || item.amenities.includes(filters.amenity);
      const matchesTier = filters.tier === 'All' || item.tier === filters.tier;
      return matchesState && matchesRegion && matchesAmenity && matchesTier;
    });
  };

  const filteredListings = applyFilters(listings);

  return (
    <>
      <Head>
        <title>Luxury Camp Listings | LuxeCampUSA</title>
      </Head>
      <div className="listings-container">
        <aside className="filter-sidebar">
          <h3>Filter Listings</h3>

          <label>State</label>
          <select value={filters.state} onChange={e => setFilters({ ...filters, state: e.target.value })}>
            <option value="">All</option>
            {uniqueStates.map((s, i) => <option key={i} value={s}>{s}</option>)}
          </select>

          <label>Region</label>
          <select value={filters.region} onChange={e => setFilters({ ...filters, region: e.target.value })}>
            <option value="">All</option>
            {uniqueRegions.map((r, i) => <option key={i} value={r}>{r}</option>)}
          </select>

          <label>Amenity</label>
          <select value={filters.amenity} onChange={e => setFilters({ ...filters, amenity: e.target.value })}>
            <option value="">All</option>
            {uniqueAmenities.map((a, i) => <option key={i} value={a}>{a}</option>)}
          </select>

          <label>Tier</label>
          <select value={filters.tier} onChange={e => setFilters({ ...filters, tier: e.target.value })}>
            <option>All</option>
            <option>Premium</option>
            <option>Featured</option>
            <option>Standard</option>
          </select>
        </aside>

        <main className="listing-grid">
          {filteredListings.map((item, i) => (
            <div className="listing-card" key={i}>
              <img src={item.image} alt={item.name} />
              <div className="listing-info">
                <h2>{item.name}</h2>
                <p>{item.location}</p>
                <p><strong>{item.tier}</strong></p>
                <p>{item.amenities.join(', ')}</p>
              </div>
            </div>
          ))}
        </main>
      </div>
    </>
  );
}
