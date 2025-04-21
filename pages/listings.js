
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

  const [filters, setFilters] = useState({
    state: '',
    region: '',
    amenities: '',
    tier: 'All'
  });

  const applyFilters = (listings) => {
    return listings.filter(item => {
      const matchesState = filters.state === '' || item.state.toLowerCase().includes(filters.state.toLowerCase());
      const matchesRegion = filters.region === '' || item.region.toLowerCase().includes(filters.region.toLowerCase());
      const matchesAmenities = filters.amenities === '' || filters.amenities.split(',').every(a =>
        item.amenities.join(',').toLowerCase().includes(a.trim().toLowerCase())
      );
      const matchesTier = filters.tier === 'All' || item.tier === filters.tier;
      return matchesState && matchesRegion && matchesAmenities && matchesTier;
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
          <input type="text" placeholder="e.g. WY" value={filters.state} onChange={e => setFilters({ ...filters, state: e.target.value })} />
          <label>Region</label>
          <input type="text" placeholder="e.g. West" value={filters.region} onChange={e => setFilters({ ...filters, region: e.target.value })} />
          <label>Amenities</label>
          <input type="text" placeholder="e.g. Pool, WiFi" value={filters.amenities} onChange={e => setFilters({ ...filters, amenities: e.target.value })} />
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
