import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://gaououtwpadqzglqlirk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdhb3VvdXR3cGFkcXpnbHFsaXJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxMTQ2MjMsImV4cCI6MjA2MDY5MDYyM30.DSWPFMz6xx5QnfD7Luu-Q9qEwSELL2HmVjFX5Dbi2_Y"
);

export default function ListingsDebug() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchListings() {
      const { data, error } = await supabase.from("listings").select("*");
      setData(data);
      setError(error);
    }

    fetchListings();
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Debug: Raw Supabase Listings</h1>
      {error && <p style={{ color: "red" }}>❌ Error: {error.message}</p>}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}