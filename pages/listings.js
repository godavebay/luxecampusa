import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://gaououtwpadqzglqlirk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdhb3VvdXR3cGFkcXpnbHFsaXJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxMTQ2MjMsImV4cCI6MjA2MDY5MDYyM30.DSWPFMz6xx5QnfD7Luu-Q9qEwSELL2HmVjFX5Dbi2_Y"
);

const ALL_AMENITIES = ["Pool", "Golf", "Firepit", "Wifi", "Pet Friendly", "Private Bathroom", "EV Charging"];

export default function Listings() {
  const [allListings, setAllListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    state: "",
    region: "",
    tier: "",
    amenities: []
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchListings();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [allListings, filters, search]);

  async function fetchListings() {
    const { data } = await supabase.from("listings").select("*").neq("tier", "Pending");
    setAllListings(data || []);
  }

  function applyFilters() {
    let filtered = [...allListings];
    if (filters.state) filtered = filtered.filter(l => l.state === filters.state);
    if (filters.region) filtered = filtered.filter(l => l.region === filters.region);
    if (filters.tier) filtered = filtered.filter(l => l.tier === filters.tier);
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(l => {
        return filters.amenities.every(a => l.amenities?.includes(a));
      });
    }
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(l =>
        l.name.toLowerCase().includes(s) ||
        l.description?.toLowerCase().includes(s) ||
        l.region?.toLowerCase().includes(s)
      );
    }
    setFilteredListings(filtered);
  }

  function handleAmenityToggle(amenity) {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  }

  const states = [...new Set(allListings.map(l => l.state))].filter(Boolean);
  const regions = [...new Set(allListings.map(l => l.region))].filter(Boolean);
  const tiers = [...new Set(allListings.map(l => l.tier))].filter(Boolean);

  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", fontFamily: "sans-serif" }}>
      <button onClick={() => setShowFilters(!showFilters)} style={{ margin: "10px", padding: "10px", background: "#0070f3", color: "#fff", border: "none", borderRadius: "6px", display: "block", width: "100%" }}>
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      {showFilters && (
        <aside style={{ width: "100%", maxWidth: "300px", padding: "20px", borderRight: "1px solid #ddd", background: "#f8f8f8" }}>
          <h3>Search & Filters</h3>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />

          <label>State:</label>
          <select value={filters.state} onChange={e => setFilters({ ...filters, state: e.target.value })} style={{ width: "100%", marginBottom: "10px" }}>
            <option value="">All</option>
            {states.map(state => <option key={state} value={state}>{state}</option>)}
          </select>

          <label>Region:</label>
          <select value={filters.region} onChange={e => setFilters({ ...filters, region: e.target.value })} style={{ width: "100%", marginBottom: "10px" }}>
            <option value="">All</option>
            {regions.map(region => <option key={region} value={region}>{region}</option>)}
          </select>

          <label>Tier:</label>
          <select value={filters.tier} onChange={e => setFilters({ ...filters, tier: e.target.value })} style={{ width: "100%", marginBottom: "10px" }}>
            <option value="">All</option>
            {tiers.map(tier => <option key={tier} value={tier}>{tier}</option>)}
          </select>

          <label>Amenities:</label>
          <div style={{ display: "flex", flexDirection: "column", marginTop: "5px" }}>
            {ALL_AMENITIES.map(amenity => (
              <label key={amenity} style={{ fontSize: "14px" }}>
                <input
                  type="checkbox"
                  checked={filters.amenities.includes(amenity)}
                  onChange={() => handleAmenityToggle(amenity)}
                /> {amenity}
              </label>
            ))}
          </div>
        </aside>
      )}

      <main style={{ flexGrow: 1, padding: "20px", width: "100%" }}>
        <h1 style={{ textAlign: "center" }}>Explore LuxeCamp Listings</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
          {filteredListings.map((listing, idx) => (
            <div key={idx} style={{ background: "#fff", borderRadius: "10px", overflow: "hidden", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
              {listing.image_urls?.[0] && (
                <img src={listing.image_urls[0]} alt={listing.name} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
              )}
              <div style={{ padding: "16px" }}>
                <h2>{listing.name}</h2>
                <p><strong>{listing.state}</strong> • {listing.region} • {listing.tier}</p>
                <p>{listing.description}</p>
                <p style={{ fontSize: "13px", marginTop: "8px" }}>
                  <strong>Amenities:</strong> {listing.amenities?.join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}