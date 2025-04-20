import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://gaououtwpadqzglqlirk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdhb3VvdXR3cGFkcXpnbHFsaXJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxMTQ2MjMsImV4cCI6MjA2MDY5MDYyM30.DSWPFMz6xx5QnfD7Luu-Q9qEwSELL2HmVjFX5Dbi2_Y"
);

export default function Admin() {
  const [listings, setListings] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    state: "",
    region: "",
    tier: "Standard",
    phone: "",
    website: "",
    image_urls: ""
  });

  useEffect(() => {
    fetchListings();
  }, []);

  async function fetchListings() {
    const { data } = await supabase.from("listings").select("*").order("created_at", { ascending: false });
    setListings(data || []);
  }

  async function addListing() {
    const payload = {
      ...form,
      image_urls: form.image_urls.split(",").map(url => url.trim())
    };
    await supabase.from("listings").insert([payload]);
    setForm({ name: "", description: "", state: "", region: "", tier: "Standard", phone: "", website: "", image_urls: "" });
    fetchListings();
  }

  async function deleteListing(id) {
    await supabase.from("listings").delete().eq("id", id);
    fetchListings();
  }

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Admin Dashboard</h1>

      <h2>Add New Listing</h2>
      <div style={{ display: "grid", gap: "10px", maxWidth: "600px" }}>
        {["name", "description", "state", "region", "tier", "phone", "website", "image_urls"].map(key => (
          <input
            key={key}
            placeholder={key}
            value={form[key]}
            onChange={e => setForm({ ...form, [key]: e.target.value })}
            style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }}
          />
        ))}
        <button onClick={addListing} style={{ padding: "12px", background: "#000", color: "#fff", borderRadius: "6px" }}>
          Add Listing
        </button>
      </div>

      <h2 style={{ marginTop: "40px" }}>All Listings</h2>
      <div style={{ display: "grid", gap: "20px", marginTop: "20px" }}>
        {listings.map((listing, idx) => (
          <div key={idx} style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px", background: "#f9f9f9" }}>
            <strong>{listing.name}</strong> <br />
            {listing.description} <br />
            {listing.state}, {listing.region} – {listing.tier} <br />
            <a href={listing.website} target="_blank">{listing.website}</a> <br />
            <button onClick={() => deleteListing(listing.id)} style={{ marginTop: "10px", background: "#f00", color: "#fff", border: "none", padding: "8px 12px", borderRadius: "4px" }}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}