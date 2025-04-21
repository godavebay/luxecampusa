
import Head from 'next/head';

export default function Listings() {
  const listings = [
    {
      name: "Whispering Pines RV Resort",
      location: "Jackson Hole, WY",
      tier: "Premium",
      image: "/rv-resort.jpg",
      amenities: ["Pool", "Golf", "Spa"]
    },
    {
      name: "Golden Sky Glamping Retreat",
      location: "Asheville, NC",
      tier: "Featured",
      image: "/glamping-retreat.jpg",
      amenities: ["Hot Tub", "Fire Pit", "WiFi"]
    },
    {
      name: "Treehouse Haven",
      location: "Big Sur, CA",
      tier: "Standard",
      image: "/treehouse.jpg",
      amenities: ["Mountain View", "BBQ", "Luxury Bedding"]
    }
  ];

  return (
    <>
      <Head>
        <title>Luxury Camp Listings | LuxeCampUSA</title>
      </Head>
      <div className="listings-container">
        <aside className="filter-sidebar">
          <h3>Filter Listings</h3>
          <label>State</label><input type="text" placeholder="e.g. Colorado" />
          <label>Region</label><input type="text" placeholder="e.g. West" />
          <label>Amenities</label><input type="text" placeholder="e.g. Pool, WiFi" />
          <label>Tier</label>
          <select>
            <option>All</option>
            <option>Premium</option>
            <option>Featured</option>
            <option>Standard</option>
          </select>
          <button>Apply Filters</button>
        </aside>
        <main className="listing-grid">
          {listings.map((item, i) => (
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
