
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
          <img src="/feature-icons.png" alt="Verified Luxury Only, Direct Booking Access, Always Growing" className="features-image" />
        </section>

        <footer>
          <p>&copy; {new Date().getFullYear()} LuxeCampUSA. All rights reserved.</p>
          <p>info@luxecampusa.com</p>
        </footer>
      </div>
    </>
  );
}
