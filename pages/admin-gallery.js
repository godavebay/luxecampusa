import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://gaououtwpadqzglqlirk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdhb3VvdXR3cGFkcXpnbHFsaXJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxMTQ2MjMsImV4cCI6MjA2MDY5MDYyM30.DSWPFMz6xx5QnfD7Luu-Q9qEwSELL2HmVjFX5Dbi2_Y"
);

export default function AdminGallery() {
  const [listings, setListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState([]);

  useEffect(() => {
    async function fetchListings() {
      const { data } = await supabase.from("listings").select("id, name");
      setListings(data || []);
    }
    fetchListings();
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    setFiles([...files, ...Array.from(e.dataTransfer.files)]);
  };

  const handleFileSelect = (e) => {
    setFiles([...files, ...Array.from(e.target.files)]);
  };

  async function uploadImages() {
    if (!selectedListing || files.length === 0) return;
    setUploading(true);
    const urls = [];

    for (const file of files) {
      const filename = `${selectedListing}-${Date.now()}-${file.name}`;
      const { error } = await supabase.storage.from("listing-gallery").upload(filename, file);
      if (!error) {
        const { data } = supabase.storage.from("listing-gallery").getPublicUrl(filename);
        urls.push(data.publicUrl);
      }
    }

    const { data: listing } = await supabase.from("listings").select("image_urls").eq("id", selectedListing).single();
    const updatedUrls = [...(listing.image_urls || []), ...urls];

    await supabase.from("listings").update({ image_urls: updatedUrls }).eq("id", selectedListing);

    setUploadedUrls(urls);
    setFiles([]);
    setUploading(false);
    alert("Images uploaded and listing updated.");
  }

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Admin: Upload Listing Gallery</h1>

      <label>Select Listing</label>
      <select onChange={(e) => setSelectedListing(e.target.value)} style={{ padding: "10px", marginBottom: "20px" }}>
        <option value="">-- Select a Listing --</option>
        {listings.map((listing) => (
          <option key={listing.id} value={listing.id}>{listing.name}</option>
        ))}
      </select>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        style={{ padding: "40px", border: "2px dashed #ccc", marginBottom: "20px", borderRadius: "10px", textAlign: "center" }}
      >
        <p>Drag and drop images here</p>
        <input type="file" multiple onChange={handleFileSelect} />
      </div>

      <button onClick={uploadImages} disabled={uploading || !selectedListing} style={{ padding: "12px 24px", backgroundColor: "#0070f3", color: "#fff", border: "none", borderRadius: "6px" }}>
        {uploading ? "Uploading..." : "Upload Images"}
      </button>

      {uploadedUrls.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h2>Uploaded Images:</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {uploadedUrls.map((url, idx) => (
              <img key={idx} src={url} alt="Uploaded" style={{ width: "150px", borderRadius: "8px" }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}