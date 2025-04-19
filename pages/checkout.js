import { useEffect } from "react";

export default function Checkout() {
  useEffect(() => {
    const startCheckout = async () => {
      try {
        const res = await fetch("/api/create-checkout-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        console.log("Stripe session response:", data); // ✅ Log the response

        if (data.url) {
          window.location.href = data.url;
        } else {
          alert("Failed to get Stripe URL. Check console for details.");
        }
      } catch (err) {
        console.error("Error during checkout:", err);
        alert("Checkout error. Check console.");
      }
    };

    startCheckout();
  }, []);

  return <p>Redirecting to secure payment...</p>;
}
