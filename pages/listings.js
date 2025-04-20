import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gaououtwpadqzglqlirk.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdhb3VvdXR3cGFkcXpnbHFsaXJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxMTQ2MjMsImV4cCI6MjA2MDY5MDYyM30.DSWPFMz6xx5QnfD7Luu-Q9qEwSELL2HmVjFX5Dbi2_Y";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Listings() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetchListings();

    const subscription = supabase
      .channel('public:listings')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'listings' }, payload => {
        fetchListings();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  async function fetchListings() {
    const { data, error } = await supabase.from("listings").select("*").order("created_at", { ascending: false });
    if (!error) setListings(data);
  }

  return (
    <div style={{ fontFamily: "sans-serif", padding: "40px", backgroundColor: "#f8f8f8" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>Live LuxeCamp Listings</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "30px" }}>
        {listings.map((listing, idx) => (
          <div key={idx} style={{ backgroundColor: "#fff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
            {listing.image_urls && listing.image_urls.length > 0 && (
              <img src={listing.image_urls[0]} alt={listing.name} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
            )}
            <div style={{ padding: "20px" }}>
              <h2>{listing.name}</h2>
              <p><strong>State:</strong> {listing.state}</p>
              <p><strong>Region:</strong> {listing.region}</p>
              <p><strong>Sponsor Tier:</strong> {listing.tier}</p>
              {listing.phone && <p><strong>Phone:</strong> {listing.phone}</p>}
              {listing.website && <p><strong>Website:</strong> <a href={listing.website} target="_blank" rel="noreferrer">{listing.website}</a></p>}
              {listing.description && <p style={{ marginTop: "10px" }}>{listing.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}