export default function SponsorPage() {
  const redirectToCheckout = async (priceId) => {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Failed to redirect to Stripe. Try again.");
    }
  };

  return (
    <div style={{ fontFamily: "serif", backgroundColor: "#fdfaf6", color: "#1a1a1a" }}>
      <div style={{
        backgroundImage: "url('/sponsor-hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "300px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        textShadow: "0 0 10px rgba(0,0,0,0.7)"
      }}>
        <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>Partner with LuxeCampUSA</h1>
      </div>

      <div style={{ padding: "60px 20px", maxWidth: "1000px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", marginBottom: "40px" }}>Sponsorship Tiers</h2>
        <div style={{ display: "grid", gap: "40px" }}>
          <div style={tierCardStyle}>
            <h3>🟩 Standard – $199/month</h3>
            <ul>
              <li>📍 Listed in national directory</li>
              <li>🔗 Logo, link & contact info</li>
            </ul>
            <button onClick={() => redirectToCheckout("price_1REJsoIsMFIuFtfK6AdD46sh")} style={buttonStyle}>Choose Standard</button>
          </div>

          <div style={{ ...tierCardStyle, borderColor: "#999" }}>
            <h3>🟨 Featured – $399/month</h3>
            <ul>
              <li>⭐ All Standard benefits</li>
              <li>🏅 Priority in state-level listings</li>
            </ul>
            <button onClick={() => redirectToCheckout("price_1REJtkIsMFIuFtfKaiRPWkNA")} style={buttonStyle}>Choose Featured</button>
          </div>

          <div style={{ ...tierCardStyle, borderColor: "gold" }}>
            <h3>🟥 Premium – $699/month</h3>
            <ul>
              <li>🏆 All Featured benefits</li>
              <li>🏕 Homepage visibility</li>
              <li>📰 LuxeCamp Journal feature</li>
            </ul>
            <button onClick={() => redirectToCheckout("price_1RFfOFIsMFIuFtfKRwHHs8d6")} style={buttonStyle}>Choose Premium</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const tierCardStyle = {
  border: "2px solid #ccc",
  borderRadius: "12px",
  padding: "20px",
  backgroundColor: "#fff",
  boxShadow: "0 0 10px rgba(0,0,0,0.05)"
};

const buttonStyle = {
  backgroundColor: "#000",
  color: "#fff",
  padding: "10px 20px",
  borderRadius: "6px",
  marginTop: "10px",
  cursor: "pointer",
  fontSize: "16px"
};