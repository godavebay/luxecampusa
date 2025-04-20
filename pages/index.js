
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>LuxeCampUSA</title>
      </Head>
      <nav className="navbar">
        <div className="nav-content">
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>
      <div className="homepage">
        <section id="hero" className="hero">
          <div className="floating-banner first">
            <h1>Discover America’s Most Exclusive Campgrounds & Glamping Retreats</h1>
            <p>Curated for luxury. Driven by experience. Built for adventure.</p>
            <a href="#features" className="btn yellow-btn">Explore Listings</a>
          </div>

          <div className="floating-banner second">
            <h2>What Makes LuxeCampUSA Different?</h2>
            <p>Every site listed meets our standard for exceptional design, comfort, and experience.</p>
            <p>No middleman. Book directly with the camp or resort of your choice.</p>
            <p>We’re continuously adding new luxury properties, sponsors, and premium experiences.</p>
          </div>

          <div className="floating-banner third">
            <h2>Properties We Feature</h2>
            <div className="property-grid">
              <div className="property-card">
                <img src="/rv-resort.jpg" alt="Luxury RV Resort" />
                <p>🌲 Luxury RV Resorts</p>
              </div>
              <div className="property-card">
                <img src="/glamping-retreat.jpg" alt="Glamping Retreat" />
                <p>🏕️ Glamping Retreats</p>
              </div>
              <div className="property-card">
                <img src="/treehouse.jpg" alt="Treehouse Escape" />
                <p>🌄 Treehouse + Tiny Home Escapes</p>
              </div>
            </div>
          </div>
        </section>

        <footer id="contact">
          <p>&copy; {new Date().getFullYear()} LuxeCampUSA. All rights reserved.</p>
          <p>info@luxecampusa.com</p>
        </footer>
      </div>
    </>
  );
}
