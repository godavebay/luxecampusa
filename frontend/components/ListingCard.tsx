import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';

export default function ListingCard({ listing }) {
  const [average, setAverage] = useState(null);

  useEffect(() => {
    const fetchAverage = async () => {
      const { data } = await supabase
        .from("reviews")
        .select("rating", { count: "exact" })
        .eq("listing_id", listing.id);
      if (data && data.length) {
        const avg = data.reduce((a, b) => a + b.rating, 0) / data.length;
        setAverage(avg.toFixed(1));
      }
    };
    fetchAverage();
  }, [listing.id]);

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl">{listing.title}</h2>
      {average && <p>⭐ {average}/5</p>}
    </div>
  );
}