
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-4 bg-[url('https://images.unsplash.com/photo-1621961458255-d0a5c1303613')] bg-cover bg-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-3xl leading-tight">Discover America’s Most Exclusive Campgrounds & Glamping Retreats</h1>
        <p className="text-lg md:text-xl mb-6 max-w-xl text-white/80">Curated for luxury. Driven by experience. Built for adventure.</p>
        <Link href="/listings" className="bg-white text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-gold transition">Explore Listings</Link>
      </section>

      {/* What is LuxeCampUSA */}
      <section className="bg-white text-black px-6 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">What Makes LuxeCampUSA Different?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
          <div>
            <h3 className="text-xl font-bold mb-2">Verified Luxury Only</h3>
            <p>Every site listed meets our standard for exceptional design, comfort, and experience.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Direct Booking Access</h3>
            <p>No middleman. Book directly with the camp or resort of your choice.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Always Growing</h3>
            <p>We’re continuously adding new luxury properties, sponsors, and premium experiences.</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-[#111] text-white px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8">Experience It All</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {["Luxury RV Resorts", "Glamping Domes", "Tiny Homes", "Treehouses"].map((category, i) => (
            <div key={i} className="bg-[#1c1c1c] p-6 rounded-xl shadow-md text-center hover:bg-gold hover:text-black transition">
              <h3 className="text-lg font-semibold">{category}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white text-black px-6 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div>
            <h3 className="text-xl font-bold mb-2">1. Search</h3>
            <p>Use our filters to browse by location, tier, and amenities.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">2. Discover</h3>
            <p>Explore real-time photo galleries and detailed listings.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">3. Connect</h3>
            <p>Click through to book directly with the hosts or resorts.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#000] text-white px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">Join the LuxeCamp Movement</h2>
        <p className="text-lg mb-8 text-white/80">Own a luxury campground or glamping site? Get featured. Want to sponsor? Partner with us.</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/submit-listing" className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gold transition">Submit a Listing</Link>
          <Link href="/sponsor" className="border border-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-black transition">Become a Sponsor</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111] text-white px-6 py-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} LuxeCampUSA. All rights reserved.</p>
        <p className="mt-2">info@luxecampusa.com</p>
      </footer>
    </div>
  );
}
