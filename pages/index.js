
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
          <div className="floating-banner">
            <h1>Discover America’s Most Exclusive Campgrounds & Glamping Retreats</h1>
            <p>Curated for luxury. Driven by experience. Built for adventure.</p>
            <a href="#second" className="btn yellow-btn">Explore Listings</a>
          </div>
        </section>

        <section id="second" className="scroll-section">
          <div className="scroll-banner">
            <h2>What Makes LuxeCampUSA Different?</h2>
            <p>Every site listed meets our standard for exceptional design, comfort, and experience.</p>
            <p>No middleman. Book directly with the camp or resort of your choice.</p>
            <p>We’re continuously adding new luxury properties, sponsors, and premium experiences.</p>
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
