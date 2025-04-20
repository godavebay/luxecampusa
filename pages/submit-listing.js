import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://gaououtwpadqzglqlirk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdhb3VvdXR3cGFkcXpnbHFsaXJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxMTQ2MjMsImV4cCI6MjA2MDY5MDYyM30.DSWPFMz6xx5QnfD7Luu-Q9qEwSELL2HmVjFX5Dbi2_Y"
);

export default function SubmitListing() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    state: "",
    region: "",
    phone: "",
    website: "",
    image_urls: ""
  });
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      ...form,
      tier: "Pending",
      image_urls: form.image_urls.split(",").map(url => url.trim())
    };
    const { error } = await supabase.from("listings").insert([payload]);
    if (!error) {
      setSubmitted(true);
      setForm({ name: "", description: "", state: "", region: "", phone: "", website: "", image_urls: "" });
    } else {
      alert("There was an error submitting your listing.");
    }
  }

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif", maxWidth: "700px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Submit Your Campground or Glamping Listing</h1>
      {submitted ? (
        <p style={{ textAlign: "center", color: "green", fontWeight: "bold" }}>✅ Thank you! Your listing has been submitted and is awaiting review.</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "10px" }}>
          {["name", "description", "state", "region", "phone", "website", "image_urls"].map(key => (
            <input
              key={key}
              required={key !== "phone" && key !== "website"}
              placeholder={key}
              value={form[key]}
              onChange={e => setForm({ ...form, [key]: e.target.value })}
              style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }}
            />
          ))}
          <button type="submit" style={{ padding: "12px", background: "#0070f3", color: "#fff", border: "none", borderRadius: "6px" }}>
            Submit Listing
          </button>
        </form>
      )}
    </div>
  );
}