
import { useRouter } from 'next/router';
import Head from 'next/head';

const mockData = {
  "whispering-pines": {
    name: "Whispering Pines RV Resort",
    location: "Jackson Hole, WY",
    tier: "Premium",
    image: "/rv-resort.jpg",
    amenities: ["Pool", "Golf", "Spa"],
    description: "Nestled in the scenic beauty of Wyoming, this luxury RV resort offers top-tier amenities and unforgettable mountain views.",
    bookingLink: "https://example.com/whispering-pines"
  },
  "golden-sky": {
    name: "Golden Sky Glamping Retreat",
    location: "Asheville, NC",
    tier: "Featured",
    image: "/glamping-retreat.jpg",
    amenities: ["Hot Tub", "Fire Pit", "WiFi"],
    description: "A forest glamping getaway for couples and families, surrounded by nature and modern luxury.",
    bookingLink: "https://example.com/golden-sky"
  },
  "treehouse-haven": {
    name: "Treehouse Haven",
    location: "Big Sur, CA",
    tier: "Standard",
    image: "/treehouse.jpg",
    amenities: ["Mountain View", "BBQ", "Luxury Bedding"],
    description: "A magical escape in the redwoods with handcrafted treehouses and cozy comforts.",
    bookingLink: "https://example.com/treehouse-haven"
  }
};

export default function ListingDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const data = mockData[slug];

  if (!data) return <div style={{ color: 'white', padding: '2rem' }}>Listing not found.</div>;

  return (
    <>
      <Head>
        <title>{data.name} | LuxeCampUSA</title>
      </Head>
      <div className="detail-container">
        <img className="detail-hero" src={data.image} alt={data.name} />
        <div className="detail-content">
          <h1>{data.name}</h1>
          <h3>{data.location} • <span className="tier-badge">{data.tier}</span></h3>
          <p className="description">{data.description}</p>
          <h4>Amenities</h4>
          <ul>
            {data.amenities.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
          <a href={data.bookingLink} target="_blank" rel="noopener noreferrer" className="book-btn">
            Book Now
          </a>
        </div>
      </div>
    </>
  );
}
