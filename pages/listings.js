import Image from "next/image";

const sampleListings = [
  {
    name: "Golden Ridge Glamping",
    state: "California",
    region: "Pacific Coast",
    phone: "123-456-7890",
    website: "https://goldenridge.example.com",
    sponsor: "Premium",
    images: ["/camp1.jpg", "/camp2.jpg", "/camp3.jpg"]
  },
  {
    name: "Whispering Pines Resort",
    state: "Colorado",
    region: "Rocky Mountains",
    phone: "987-654-3210",
    website: "https://whisperingpines.example.com",
    sponsor: "Featured",
    images: ["/camp2.jpg", "/camp3.jpg", "/camp1.jpg"]
  },
  {
    name: "Lakeview Luxe Retreat",
    state: "New York",
    region: "Hudson Valley",
    phone: "555-123-4567",
    website: "https://lakeviewluxe.example.com",
    sponsor: "Standard",
    images: ["/camp3.jpg", "/camp1.jpg", "/camp2.jpg"]
  }
];

export default function Listings() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: "40px", backgroundColor: "#f8f8f8" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>Explore LuxeCamp Listings</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "30px" }}>
        {sampleListings.map((listing, idx) => (
          <div key={idx} style={{ backgroundColor: "#fff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
            <div style={{ display: "flex", overflowX: "scroll" }}>
              {listing.images.map((img, i) => (
                <img key={i} src={img} alt={listing.name} style={{ width: "300px", height: "200px", objectFit: "cover" }} />
              ))}
            </div>
            <div style={{ padding: "20px" }}>
              <h2 style={{ margin: "0 0 10px 0" }}>{listing.name}</h2>
              <p style={{ margin: "5px 0" }}><strong>State:</strong> {listing.state}</p>
              <p style={{ margin: "5px 0" }}><strong>Region:</strong> {listing.region}</p>
              <p style={{ margin: "5px 0" }}><strong>Phone:</strong> {listing.phone}</p>
              <p style={{ margin: "5px 0" }}><strong>Website:</strong> <a href={listing.website} target="_blank" rel="noopener noreferrer">{listing.website}</a></p>
              <p style={{ margin: "5px 0", fontWeight: "bold", color: "#c08800" }}>{listing.sponsor} Sponsor</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}