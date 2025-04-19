import { useEffect } from "react";

export default function Checkout() {
  useEffect(() => {
    const startCheckout = async () => {
      try {
        const res = await fetch("/api/create-checkout-session", {
          method: "POST",
        });

        const data = await res.json();

        if (data.url) {
          window.location.href = data.url;
        } else {
          console.error("Stripe session failed:", data);
        }
      } catch (err) {
        console.error("Error during checkout:", err);
      }
    };

    startCheckout();
  }, []);

  return <p>Redirecting to secure payment...</p>;
}
