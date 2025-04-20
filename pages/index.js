
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>LuxeCampUSA</title>
      </Head>
      <div className="homepage">

        <section className="hero">
          <div className="hero-overlay">
            <div className="hero-text">
              <h1>Discover America’s Most Exclusive Campgrounds & Glamping Retreats</h1>
              <p>Curated for luxury. Driven by experience. Built for adventure.</p>
              <a href="/listings" className="btn">Explore Listings</a>
            </div>
          </div>
        </section>

        <section className="features">
          <h2>What Makes LuxeCampUSA Different?</h2>
          <div className="feature-grid">
            <div><h3>Verified Luxury Only</h3><p>Every site listed meets our standard for exceptional design, comfort, and experience.</p></div>
            <div><h3>Direct Booking Access</h3><p>No middleman. Book directly with the camp or resort of your choice.</p></div>
            <div><h3>Always Growing</h3><p>We’re continuously adding new luxury properties, sponsors, and premium experiences.</p></div>
          </div>
        </section>

        <section className="categories">
          <h2>Experience It All</h2>
          <div className="category-grid">
            <div><img src="/img-rv.jpg" alt="Luxury RV"/><p>Luxury RV Resorts</p></div>
            <div><img src="/img-dome.jpg" alt="Dome"/><p>Glamping Domes</p></div>
            <div><img src="/img-tiny.jpg" alt="Tiny Home"/><p>Tiny Homes</p></div>
            <div><img src="/img-treehouse.jpg" alt="Treehouse"/><p>Treehouses</p></div>
          </div>
        </section>

        <section className="cta">
          <h2>Join the LuxeCamp Movement</h2>
          <p>Own a luxury campground or glamping site? Get featured. Want to sponsor? Partner with us.</p>
          <div className="cta-buttons">
            <a href="/submit-listing" className="btn">Submit a Listing</a>
            <a href="/sponsor" className="btn-outline">Become a Sponsor</a>
          </div>
        </section>

        <footer>
          <p>&copy; {new Date().getFullYear()} LuxeCampUSA. All rights reserved.</p>
          <p>info@luxecampusa.com</p>
        </footer>
      </div>
    </>
  );
}
