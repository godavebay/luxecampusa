import { useEffect } from "react";

export default function Checkout() {
  useEffect(() => {
    fetch("/api/create-checkout-session", {
      method: "POST",
    })
      .then(res => res.json())
      .then(data => {
        if (data.url) {
          window.location.href = data.url;
        }
      });
  }, []);

  return <p>Redirecting to secure payment...</p>;
}