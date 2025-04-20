
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>LuxeCampUSA</title>
      </Head>
      <nav className="navbar">
        <div className="nav-content">
          <a href="#hero">Home</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>
      <div className="homepage">
        <section id="hero" className="hero"></section>

        <section id="features" className="features">
          <h2>What Makes LuxeCampUSA Different?</h2>
          <div className="feature-grid">
            <div><h3>Verified Luxury Only</h3><p>Every site listed meets our standard for exceptional design, comfort, and experience.</p></div>
            <div><h3>Direct Booking Access</h3><p>No middleman. Book directly with the camp or resort of your choice.</p></div>
            <div><h3>Always Growing</h3><p>We’re continuously adding new luxury properties, sponsors, and premium experiences.</p></div>
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
