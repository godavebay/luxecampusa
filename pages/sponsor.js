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
    <div style={{ padding: "50px", fontFamily: "sans-serif", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Become a LuxeCampUSA Sponsor</h1>
      
      <div style={{ display: "grid", gap: "30px" }}>
        <div style={{ border: "2px solid #ccc", borderRadius: "12px", padding: "20px" }}>
          <h2>🟩 Standard – $199/month</h2>
          <p>Basic sponsor listing with logo, link, and contact info.</p>
          <button onClick={() => redirectToCheckout("price_1REJsoIsMFIuFtfK6AdD46sh")} style={buttonStyle}>Choose Standard</button>
        </div>

        <div style={{ border: "2px solid #999", borderRadius: "12px", padding: "20px" }}>
          <h2>🟨 Featured – $399/month</h2>
          <p>Priority placement in state-level searches + all Standard benefits.</p>
          <button onClick={() => redirectToCheckout("price_1REJtkIsMFIuFtfKaiRPWkNA")} style={buttonStyle}>Choose Featured</button>
        </div>

        <div style={{ border: "2px solid gold", borderRadius: "12px", padding: "20px" }}>
          <h2>🟥 Premium – $699/month</h2>
          <p>Homepage visibility + LuxeCamp Journal feature + all lower-tier perks.</p>
          <button onClick={() => redirectToCheckout("price_1RFfOFIsMFIuFtfKRwHHs8d6")} style={buttonStyle}>Choose Premium</button>
        </div>
      </div>
    </div>
  );
}

const buttonStyle = {
  backgroundColor: "#000",
  color: "#fff",
  padding: "10px 20px",
  borderRadius: "6px",
  marginTop: "10px",
  cursor: "pointer",
  fontSize: "16px"
};